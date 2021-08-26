import React from 'react';

import './SpinnerPie.less';

export type SpinnerPieSize = 'nano' | 'micro' | 'small' | 'normal' | 'medium' | 'big' | 'biggest' | 'huge';

interface Props {
  className?: string;
  speed?: 'fast' | 'normal' | 'slow';
}

export const SpinnerPie: React.FC<Props> = ({ speed = 'normal', className }) => (
  <div className={'SpinnerPie' + (speed ? ' SpinnerPie-' + speed : '') + (className ? className : '')}>
    <span className="SpinnerPie-side SpinnerPie-sideLeft">
      <span className="SpinnerPie-leftFill" />
    </span>
    <span className="SpinnerPie-side SpinnerPie-sideRight">
      <span className="SpinnerPie-rightFill" />
    </span>
  </div>
);
