import React from 'react';

export const Check = props => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="#ffffff"
    width="1em"
    height="1em"
  >
    <path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z" />
  </svg>
);

export const CheckboxChecked = props => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="#ffffff"
    width="1em"
    height="1em"
  >
    <path d="M416 64H96c-17.7 0-32 14.3-32 32v320c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-52.5 134.5L229.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z" />
  </svg>
);

export const CheckboxUnchecked = props => (
  <svg
    viewBox="0 0 512 512"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="#ffffff"
    {...props}
    width="1em"
    height="1em"
  >
    <path d="M416,64C433.7,64 448,78.3 448,96L448,416C448,433.7 433.7,448 416,448L96,448C78.3,448 64,433.7 64,416L64,96C64,78.3 78.3,64 96,64L416,64Z" />
  </svg>
);

export const Logo = props => (
  <svg
    {...props}
    fill="#1A1414"
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <circle cx="92" cy="256" r="28" />
    <circle cx="92" cy="132" r="28" />
    <circle cx="92" cy="380" r="28" />
    <path d="M432 240H191.5c-8.8 0-16 7.2-16 16s7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16zM432 364H191.5c-8.8 0-16 7.2-16 16s7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16zM191.5 148H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H191.5c-8.8 0-16 7.2-16 16s7.2 16 16 16z" />
  </svg>
);
