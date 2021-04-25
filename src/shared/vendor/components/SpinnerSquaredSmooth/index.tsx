import React from 'react';

import './SpinnerSquaredSmooth.less';

export type SpinnerSquaredSmoothSpeed = 'fast' | 'normal' | 'slow';
export type SpinnerSquaredSmoothSize = 'nano' | 'small' | 'medium' | 'fill';

interface Props {
  size?: SpinnerSquaredSmoothSize;
  speed?: SpinnerSquaredSmoothSpeed;
}

export const SpinnerSquaredSmooth: React.FC<Props> = ({ size = 'fill', speed = 'normal' }) => (
  <svg
    className={
      'SpinnerSquaredSmooth ' +
      (size ? ' SpinnerSquaredSmooth-' + size : ' ') +
      (speed ? ' SpinnerSquaredSmooth-' + speed : ' ')
    }
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect pathLength="1" className="SpinnerSquaredSmooth-line" />
  </svg>
);
