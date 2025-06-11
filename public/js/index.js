const socket = io();

function startSession() {
  console.log('starting session');
}

function login() {
  console.log('attembting login');
}

function render(pageObj) {
  if (!pageObj.tag) return;

  document.querySelector('main').remove();

  let stack = [{ node: pageObj, parent: document.body }];
  while (stack.length > 0) {
    const { node, parent } = stack.pop();

    let element;
    if (typeof node === 'string' || typeof node === 'number') {
      element = document.createTextNode(String(node));
    } else if (typeof node === 'object') {
      try {
        element = document.createElement(node.tag);

        Object.entries(node.attrs).forEach(([key, value]) => {
          if (value !== null) {
            element.setAttribute(key, value);
          }
        });

        for (let i = 0; i < node.children.length; i++) {
          stack.push({ node: node.children[i], parent: element });
        }
      } catch (error) {
        continue;
      }
    }

    parent.prepend(element);
  }
}

socket.on(
  'statusUpdate',
  ({ sentAt, databasePing, CPULoad, activeRequests, uptime, memory }) => {
    const t0 = performance.now();
    socket.timeout(2000).emit('ping', t0, (err, echo) => {
      const rtt = err
        ? 'TIMEOUT'
        : (performance.now() - echo).toFixed(0) + ' ms';

      const data = {
        '.uptime': uptime,
        '.memory': memory,
        '.cpu': CPULoad,
        '.requests': activeRequests,
        '.db': databasePing,
        '.latency': rtt,
      };
      for (const [sel, val] of Object.entries(data)) {
        const el = document.querySelector(`.status ${sel}`);
        if (el) el.textContent = val;
      }

      let timestamp = document.querySelector('.timestamp span');
      if (timestamp)
        timestamp.textContent = new Date(sentAt).toLocaleTimeString();
    });
  }
);

document.body.addEventListener('click', function (e) {
  e.preventDefault();
  let { getPage, doAction } = e.target.dataset;
  if (getPage) {
    socket.emit('pageRequest', getPage, render);
  }

  if (doAction) {
    window[doAction](e);
  }
});
