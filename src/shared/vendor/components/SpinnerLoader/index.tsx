import React from 'react';

import './SpinnerLoader.less';

export type SpinnerLoaderSize = 'nano' | 'micro' | 'small' | 'normal' | 'medium' | 'big' | 'biggest' | 'huge';

interface Props {
  className?: string;
  size?: SpinnerLoaderSize;
}

export const SpinnerLoader: React.FC<Props> = ({ className, size = 'normal' }) => (
  <svg
    className={'SpinnerLoader' + (className ? ' ' + className : '') + (size ? ' SpinnerLoader--' + size : '')}
    viewBox="0 0 50 50"
  >
    <circle className="SpinnerLoader-circle" cx="25" cy="25" r="22.5"></circle>
  </svg>
);
