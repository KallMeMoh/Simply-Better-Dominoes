'use strict';
const socket = io();

function startSession() {
  console.log('starting session');
}

function logout() {
  fetch('/auth/logout', {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function dismissAlert(alertBox, timeoutId = 0) {
  clearTimeout(timeoutId);
  alertBox.classList.add('disappear');

  setTimeout(() => alertBox.remove(), 380);
}

const messageStack = document.querySelector('.messageStack');
function createPopupMessage(text, type = 'primary', callback = () => {}) {
  const dismissTime = (text.length * 0.3) % 60;
  let dismiss = setTimeout(() => {
    dismissAlert(alertBox);
    callback();
  }, dismissTime * 1000);

  const alertBox = document.createElement('div');
  const alertBody = document.createElement('div');
  const alertMessage = document.createElement('div');
  const msgIcon = document.createElement('i');
  msgIcon.classList.add('fa-lg');
  if (type === 'dark' || type === 'light') {
    msgIcon.classList.add('fa-solid', 'fa-bell');
  } else if (type === 'info') {
    msgIcon.classList.add('fa-solid', 'fa-exclamation');
  } else if (type === 'warning') {
    msgIcon.classList.add('fa-solid', 'fa-triangle-exclamation');
  } else if (type === 'danger') {
    msgIcon.classList.add('fa-solid', 'fa-explosion');
  } else {
    // primay / secondary / success
    msgIcon.classList.add('fa-solid', 'fa-circle-check');
  }

  const msgText = document.createElement('div');
  msgText.classList.add('small');
  msgText.innerText = text;

  alertMessage.classList.add('d-flex', 'align-items-center', 'gap-3');
  alertMessage.append(msgIcon, msgText);

  const alertDismiss = document.createElement('i');
  alertDismiss.ariaLabel = 'close';
  alertDismiss.classList.add('fa-solid', 'fa-xmark', 'fa-lg');
  alertDismiss.onclick = () => dismissAlert(alertBox, dismiss);

  alertBody.classList.add(
    'd-flex',
    'align-items-center',
    'justify-content-between',
    'gap-3',
    'px-3',
    'py-2'
  );
  alertBody.append(alertMessage, alertDismiss);

  const alertCountDown = document.createElement('div');
  const alertProgress = document.createElement('div');
  alertProgress.style.setProperty(
    'animation',
    `collapse ${dismissTime}s linear`
  );
  alertProgress.classList.add('progress-bar', `bg-${type}`);
  alertCountDown.role = 'progressbar';
  alertCountDown.ariaValueNow = text.length;
  alertCountDown.ariaValueMin = '0';
  alertCountDown.ariaValueMax = text.length;
  alertCountDown.classList.add(
    'progress',
    'bg-transparent',
    'flex-row-reverse',
    'rounded-0',
    'rounded-bottom'
  );
  alertCountDown.append(alertProgress);

  alertBox.role = 'alert';
  alertBox.classList.add(
    'appear',
    `text-${type}-emphasis`,
    `bg-${type}-subtle`,
    'rounded',
    'mb-3'
  );
  alertBox.append(alertBody, alertCountDown);

  messageStack.append(alertBox);
}

async function signup() {
  const [usernameInput, emailInput, passwordInput] = [
    document.getElementById('usernameInput'),
    document.getElementById('emailInput'),
    document.getElementById('passwordInput'),
  ];

  if (usernameInput && emailInput && passwordInput) {
    const formData = {
      username: usernameInput.value || '',
      email: emailInput.value || '',
      password: passwordInput.value || '',
    };

    try {
      const resonse = await fetch('/auth/signup', {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await resonse.json();

      if (data.OK) {
        createPopupMessage('Account Created successfully', 'success');
        createPopupMessage('Redirecting you to login...', 'info', () => {
          socket.emit('pageRequest', 'login', render);
        });
      } else {
        let errors = {};

        data.errors.forEach((err) => {
          if (!errors[err.path]) {
            createPopupMessage(err.msg, 'danger');
            errors[err.path] = true;
          }
        });
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}

async function login() {
  const [userInput, passwordInput] = [
    document.getElementById('userInput'),
    document.getElementById('passwordInput'),
  ];

  if (userInput && passwordInput) {
    const formData = {
      password: passwordInput.value,
    };
    if (/@/g.test(userInput.value)) {
      formData['email'] = userInput.value || '';
    } else {
      formData['username'] = userInput.value || '';
    }

    try {
      const resonse = await fetch('/auth/login', {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await resonse.json();

      if (data.OK) {
        socket.disconnect();
        socket.connect();
        socket.emit('pageRequest', 'rooms', render);
      } else {
        console.log(data);
        let errors = {};
        data.errors.forEach((err) => {
          if (err.type === 'field') {
            if (!errors[err.path]) {
              errors[err.path] = true;
              createPopupMessage(err.msg, 'danger');
            }
          } else if (err.type === 'alternative_grouped') {
            createPopupMessage(
              'Please enter a valid username or email!',
              'danger'
            );
          } else {
            createPopupMessage(err.msg, 'danger');
          }
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  }
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
