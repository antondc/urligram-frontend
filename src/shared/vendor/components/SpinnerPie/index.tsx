import React from 'react';

import './SpinnerPie.less';

export type SpinnerPieSize = 'nano' | 'micro' | 'small' | 'normal' | 'medium' | 'big' | 'biggest' | 'huge';

interface Props {
  className?: string;
  speed?: 'fast' | 'normal' | 'slow';
  size?: SpinnerPieSize;
}

export const SpinnerPie: React.FC<Props> = ({ speed = 'normal', className, size = 'normal' }) => (
  <div
    className={
      'SpinnerPie' +
      (speed ? ' SpinnerPie-' + speed : '') +
      (className ? ' ' + className : '') +
      (size ? ' SpinnerPie--' + size : '')
    }
  >
    <div className="SpinnerPie-side SpinnerPie-sideLeft">
      <span className="SpinnerPie-fill SpinnerPie-leftFill" />
    </div>
    <div className="SpinnerPie-side SpinnerPie-sideRight">
      <span className="SpinnerPie-fill SpinnerPie-rightFill" />
    </div>
  </div>
);
