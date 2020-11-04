import React from 'react';

import './SpinnerSquaredSmooth.less';

interface Props {
  state?: string;
}

const SpinnerSquaredSmooth: React.FC<Props> = ({ state }) => (
  <div className={'SpinnerSquaredSmooth' + (state ? 'Tag-' + state : '')}>
    <div className="SpinnerSquaredSmooth-square">
      <svg className="SpinnerSquaredSmooth-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.3 28.3">
        <path className="SpinnerSquaredSmooth-pathStatic" fill="none" d="M0 0v28.3h28.3V0H0z" />
        <path className="SpinnerSquaredSmooth-pathAnimated" fill="none" d="M0 0v28.3h28.3V0H0z" />
      </svg>
    </div>
  </div>
);

export default SpinnerSquaredSmooth;
