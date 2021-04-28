import React, { HTMLProps } from 'react';

import { Check, Cross } from '../Svg';

import './Switch.less';

interface Props extends HTMLProps<HTMLInputElement> {
  name: string;
  checked: boolean;
}

export const Switch: React.FC<Props> = ({ name, checked = false, ...props }) => (
  <label className="Switch">
    <input
      className="Switch-input"
      type="checkbox"
      name={name}
      /*defaultChecked={checked} This may be needed*/
      checked={!!checked}
      {...props}
    />
    <span className="Switch-slider " />
    <span className="Switch-icons">
      <span className="Switch-icon Switch-true">
        <Check size="small" />
      </span>
      <span className="Switch-icon Switch-false">
        <Cross size="small" />
      </span>
    </span>
  </label>
);
