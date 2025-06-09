exports.component = {
  tag: 'footer',
  attrs: {
    class: 'd-flex justify-content-center align-items-center p-3',
    style: 'height: 80px',
  },
  children: [
    {
      tag: 'p',
      attrs: { class: 'mb-0' },
      children: [
        'All rights reserved © 2025',
        {
          tag: 'span',
          attrs: { class: 'text-decoration-underline' },
          children: ['Mohammad'],
        },
      ],
    },
  ],
};
