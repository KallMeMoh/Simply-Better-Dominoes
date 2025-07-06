const header = require('./components/header.js');
const footer = require('./components/footer.js');

module.exports = {
  tag: 'main',
  attrs: {},
  children: [
    header,
    {
      tag: 'section',
      attrs: { class: 'hero' },
      children: [
        {
          tag: 'div',
          attrs: {
            class:
              'container-md pt-5 d-flex justify-content-center align-items-center h-100',
          },
          children: [
            {
              tag: 'form',
              attrs: {
                class: 'px-3 py-5 rounded-2',
                style: 'background-color: rgba(33, 37, 41, 0.7)',
              },
              children: [
                {
                  tag: 'div',
                  attrs: { class: 'mb-5' },
                  children: [
                    {
                      tag: 'h1',
                      attrs: { class: 'text-center' },
                      children: ['Welcome!'],
                    },
                  ],
                },
                {
                  tag: 'div',
                  attrs: { class: 'form-floating mb-2' },
                  children: [
                    {
                      tag: 'input',
                      attrs: {
                        type: 'text',
                        class: 'form-control',
                        id: 'userInput',
                        placeholder: 'Username | name@example.com',
                        'aria-describedby': 'userHelp',
                      },
                      children: [],
                    },
                    {
                      tag: 'label',
                      attrs: { for: 'emailInput', class: 'form-label' },
                      children: ['Email address'],
                    },
                    {
                      tag: 'div',
                      attrs: {
                        id: 'emailHelp',
                        class: 'form-text text-white-50',
                        style: 'font-size: 0.5em',
                      },
                      children: [
                        "* We'll never share your email with anyone else.",
                      ],
                    },
                  ],
                },
                {
                  tag: 'div',
                  attrs: { class: 'form-floating mb-3' },
                  children: [
                    {
                      tag: 'input',
                      attrs: {
                        type: 'password',
                        class: 'form-control',
                        id: 'passwordInput',
                        placeholder: 'Password',
                      },
                      children: [],
                    },
                    {
                      tag: 'label',
                      attrs: { for: 'passwordInput', class: 'form-label' },
                      children: ['Password'],
                    },
                  ],
                },
                {
                  tag: 'div',
                  attrs: { class: 'link mb-5 text-center' },
                  children: [
                    {
                      tag: 'span',
                      attrs: {},
                      children: [
                        "Don't Have an Account? ",
                        {
                          tag: 'a',
                          attrs: {
                            class: 'link-secondary text-decoration-underline',
                            'data-get-page': 'signup',
                          },
                          children: ['Signup'],
                        },
                        ' Already!',
                      ],
                    },
                  ],
                },
                {
                  tag: 'button',
                  attrs: {
                    type: 'submit',
                    class: 'btn btn-secondary m-auto d-block',
                    'data-do-action': 'login',
                  },
                  children: ["Let's Go"],
                },
              ],
            },
          ],
        },
      ],
    },
    footer,
  ],
};
