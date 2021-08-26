import React from 'react';

import './SpinnerPie.less';

export type SpinnerPieSize = 'nano' | 'micro' | 'small' | 'normal' | 'medium' | 'big' | 'biggest' | 'huge';

interface Props {
  speed?: 'slow' | 'normal' | 'fast';
}

export const SpinnerPie: React.FC<Props> = () => (
  <div className="ui-spinner">
    <span className="side side-left">
      <span className="fill"></span>
    </span>
    <span className="side side-right">
      <span className="fill"></span>
    </span>
  </div>
);
