import React from 'react';
import './SpinnerSquaredBrute.less';

interface Props {
  state?: string;
}

export const SpinnerSquaredBrute: React.FC<Props> = ({ state }) => {
  return (
    <div className={'SpinnerSquaredBrute' + (state ? 'Tag-' + state : '')}>
      <div className="SpinnerSquaredBrute-square2">
        <div className="SpinnerSquaredBrute-bar SpinnerSquaredBrute-barTop" />
        <div className="SpinnerSquaredBrute-bar SpinnerSquaredBrute-barRight" />
        <div className="SpinnerSquaredBrute-bar SpinnerSquaredBrute-barBottom" />
        <div className="SpinnerSquaredBrute-bar SpinnerSquaredBrute-barLeft" />
      </div>
    </div>
  );
};
