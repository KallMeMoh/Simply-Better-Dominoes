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
                { tag: 'h1', attrs: {}, children: ['Server Status'] },
                {
                  tag: 'div',
                  attrs: { class: 'row g-3' },
                  children: [
                    {
                      tag: 'div',
                      attrs: { class: 'col-md-6' },
                      children: [
                        {
                          tag: 'div',
                          attrs: {
                            class:
                              'status btn btn-dark p-3 w-100 h-100 text-white',
                          },
                          children: [
                            {
                              tag: 'strong',
                              attrs: {},
                              children: ['🟢 Server Uptime:'],
                            },
                            {
                              tag: 'span',
                              attrs: {
                                class: 'uptime',
                              },
                              children: [
                                {
                                  tag: 'i',
                                  attrs: {
                                    class: 'fa-solid fa-spinner fa-spin',
                                  },
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      attrs: { class: 'col-md-6' },
                      children: [
                        {
                          tag: 'div',
                          attrs: {
                            class:
                              'status btn btn-dark p-3 w-100 h-100 text-white',
                          },
                          children: [
                            {
                              tag: 'strong',
                              attrs: {},
                              children: ['💾 Memory Usage:'],
                            },
                            {
                              tag: 'span',
                              attrs: {
                                class: 'memory',
                              },
                              children: [
                                {
                                  tag: 'i',
                                  attrs: {
                                    class: 'fa-solid fa-spinner fa-spin',
                                  },
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      attrs: { class: 'col-md-6' },
                      children: [
                        {
                          tag: 'div',
                          attrs: {
                            class:
                              'status btn btn-dark p-3 w-100 h-100 text-white',
                          },
                          children: [
                            {
                              tag: 'strong',
                              attrs: {},
                              children: ['⚡ CPU Load:'],
                            },
                            {
                              tag: 'span',
                              attrs: {
                                class: 'cpu',
                              },
                              children: [
                                {
                                  tag: 'i',
                                  attrs: {
                                    class: 'fa-solid fa-spinner fa-spin',
                                  },
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      attrs: { class: 'col-md-6' },
                      children: [
                        {
                          tag: 'div',
                          attrs: {
                            class:
                              'status btn btn-dark p-3 w-100 h-100 text-white',
                          },
                          children: [
                            {
                              tag: 'strong',
                              attrs: {},
                              children: ['🔗 Active Requests:'],
                            },
                            {
                              tag: 'span',
                              attrs: {
                                class: 'requests',
                              },
                              children: [
                                {
                                  tag: 'i',
                                  attrs: {
                                    class: 'fa-solid fa-spinner fa-spin',
                                  },
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      attrs: { class: 'col-md-6' },
                      children: [
                        {
                          tag: 'div',
                          attrs: {
                            class:
                              'status btn btn-dark p-3 w-100 h-100 text-white',
                          },
                          children: [
                            {
                              tag: 'strong',
                              attrs: {},
                              children: ['🛢️ Database Connectivity:'],
                            },
                            {
                              tag: 'span',
                              attrs: {
                                class: 'db',
                              },
                              children: [
                                {
                                  tag: 'i',
                                  attrs: {
                                    class: 'fa-solid fa-spinner fa-spin',
                                  },
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      attrs: { class: 'col-md-6' },
                      children: [
                        {
                          tag: 'div',
                          attrs: {
                            class:
                              'status btn btn-dark p-3 w-100 h-100 text-white',
                          },
                          children: [
                            {
                              tag: 'strong',
                              attrs: {},
                              children: ['📈 Latency:'],
                            },
                            {
                              tag: 'span',
                              attrs: {
                                class: 'latency',
                              },
                              children: [
                                {
                                  tag: 'i',
                                  attrs: {
                                    class: 'fa-solid fa-spinner fa-spin',
                                  },
                                  children: [],
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
        },
      ],
    },
    footer,
  ],
};
