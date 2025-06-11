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
          attrs: { class: 'container-md h-100 pt-5' },
          children: [
            {
              tag: 'div',
              attrs: {
                class:
                  'd-flex flex-column justify-content-center align-items-center h-100 text-center gap-5',
              },
              children: [
                {
                  tag: 'img',
                  attrs: {
                    src: './images/favicon.svg',
                    alt: 'Logo',
                    width: '200px',
                  },
                  children: [],
                },
                {
                  tag: 'h1',
                  attrs: { style: 'max-width: 400px' },
                  children: ['Simply Better Dominoes'],
                },
                {
                  tag: 'div',
                  attrs: { class: 'btns' },
                  children: [
                    {
                      tag: 'button',
                      attrs: {
                        class: 'btn btn-dark',
                        'data-do-action': 'startSession',
                      },
                      children: ["Let's Play"],
                    },
                    ' ',
                    {
                      tag: 'button',
                      attrs: {
                        class: 'btn btn-dark',
                        'data-get-page': 'login',
                      },
                      children: ['Login'],
                    },
                  ],
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
