exports.component = {
  tag: 'header',
  attrs: {},
  children: [
    {
      tag: 'nav',
      attrs: { class: 'navbar navbar-expand-lg bg-main fixed-top' },
      children: [
        {
          tag: 'div',
          attrs: { class: 'container' },
          children: [
            {
              tag: 'a',
              attrs: {
                class: 'navbar-brand d-flex align-items-center gap-2',
                href: '/',
              },
              children: [
                {
                  tag: 'img',
                  attrs: {
                    src: './images/favicon.svg',
                    alt: 'Logo',
                    width: '35px',
                  },
                  children: [],
                },
                {
                  tag: 'span',
                  attrs: { class: 'h mb-0' },
                  children: ['Simply Better Dominoes'],
                },
              ],
            },
            {
              tag: 'button',
              attrs: {
                class: 'navbar-toggler border-0',
                type: 'button',
                'data-bs-toggle': 'collapse',
                'data-bs-target': '#navbarSupportedContent',
                'aria-controls': 'navbarSupportedContent',
                'aria-expanded': 'false',
                'aria-label': 'Toggle navigation',
              },
              children: [
                {
                  tag: 'i',
                  attrs: { class: 'fa-solid fa-bars fa-xl text-white' },
                  children: [],
                },
              ],
            },
            {
              tag: 'div',
              attrs: {
                class: 'collapse navbar-collapse',
                id: 'navbarSupportedContent',
              },
              children: [
                {
                  tag: 'ul',
                  attrs: {
                    class: 'navbar-nav ms-auto mb-2 mb-lg-0 mt-5 mt-lg-0 gap-3',
                  },
                  children: [
                    {
                      tag: 'li',
                      attrs: { class: 'nav-item' },
                      children: [
                        {
                          tag: 'button',
                          attrs: {
                            class:
                              'signup nav-link bg-white text-main p-2 rounded-2 border-1',
                          },
                          children: ['Sign Up'],
                        },
                      ],
                    },
                    {
                      tag: 'li',
                      attrs: { class: 'nav-item' },
                      children: [
                        {
                          tag: 'button',
                          attrs: {
                            class:
                              'login nav-link bg-white text-main p-2 rounded-2 border-1',
                          },
                          children: ['Log In'],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
