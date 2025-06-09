const { component: header } = require('./components/header.js');
const { component: footer } = require('./components/footer.js');

const os = require('os');
const formatUptime = require('../../helpers/formateUptime.js');
const { pingDB } = require('../../db/index.js');
const measureLatency = require('../../helpers/measureLatency.js');

const dbPing = await pingDB();
const latency = await measureLatency();

exports.page = {
  tag: 'main',
  attrs: {},
  Children: [
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
                            `${formatUptime(process.uptime())}`,
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
                            `${(
                              process.memoryUsage().rss /
                              1024 /
                              1024
                            ).toFixed(2)} MB`,
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
                            `${
                              os.platform() === 'win32'
                                ? 'N/A'
                                : os
                                    .loadavg()
                                    .map((load) => load.toFixed(2))
                                    .join(',')
                            }`,
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
                            `${global.activeRequests || 0}`,
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
                            `${dbPing}`,
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
                            `${latency} ms`,
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
