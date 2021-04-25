import React from 'react';

import './SpinnerCircle.less';

export type SpinnerCircleSize = 'nano' | 'small' | 'medium';
export type SpinnerCircleSpeed = 'fast' | 'normal' | 'slow';

interface Props {
  size?: SpinnerCircleSize;
  background?: boolean;
  speed?: SpinnerCircleSpeed;
}

export const SpinnerCircle: React.FC<Props> = ({ size = 'medium', background = true, speed = 'normal' }) => (
  <div
    className={
      'SpinnerCircle' +
      (size ? ' SpinnerCircle--' + size : '') +
      (background ? ' SpinnerCircle--background' : '') +
      (speed ? ' SpinnerCircle--' + speed : '')
    }
  >
    <div className="SpinnerCircle-inner1" />
    <div className="SpinnerCircle-inner2" />
  </div>
);
