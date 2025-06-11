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
  ({ databasePing, latency, CPULoad, activeRequests, uptime, memory }) => {
    console.log('I am receiving server status updates!');
    const updates = {
      '.uptime': uptime,
      '.memory': memory,
      '.cpu': CPULoad,
      '.requests': activeRequests,
      '.db': databasePing,
      '.latency': latency,
    };

    Object.entries(updates).forEach(([selector, value]) => {
      const element = document.querySelector(`.status ${selector}`);
      if (element) element.innerHTML = value;
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
