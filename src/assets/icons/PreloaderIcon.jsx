import * as React from 'react';

const SvgPreloader = (props) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      opacity={0.8}
      d="M47.5 25a22.5 22.5 0 1 1-45.001 0A22.5 22.5 0 0 1 47.5 25h0Z"
    />
  </svg>
);

export default SvgPreloader;
