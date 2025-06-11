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
              'container pt-5 d-flex justify-content-center align-items-center h-100',
          },
          children: [
            {
              tag: 'form',
              attrs: {
                class: 'px-3 rounded-2',
                style: 'background-color: rgba(33, 37, 41, 0.7)',
              },
              children: [
                {
                  tag: 'div',
                  attrs: { class: 'p-5' },
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
                  attrs: { class: 'form-floating mb-3' },
                  children: [
                    {
                      tag: 'input',
                      attrs: {
                        type: 'text',
                        class: 'form-control',
                        id: 'usernameInput',
                        placeholder: 'Moh',
                      },
                      children: [],
                    },
                    {
                      tag: 'label',
                      attrs: { for: 'usernameInput', class: 'form-label' },
                      children: ['Username'],
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
                        type: 'email',
                        class: 'form-control',
                        id: 'emailInput',
                        placeholder: 'name@example.com',
                        'aria-describedby': 'emailHelp',
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
                  attrs: { class: 'link text-center' },
                  children: [
                    {
                      tag: 'span',
                      attrs: {},
                      children: [
                        'Already Have an Account? ',
                        {
                          tag: 'a',
                          attrs: {
                            class: 'link-secondary text-decoration-underline',
                            'data-get-page': 'login',
                          },
                          children: ['Login'],
                        },
                        ' instead!',
                      ],
                    },
                  ],
                },
                {
                  tag: 'button',
                  attrs: {
                    type: 'submit',
                    class: 'btn btn-secondary m-auto d-block my-4 my-lg-5',
                    'data-do-action': 'signup',
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
