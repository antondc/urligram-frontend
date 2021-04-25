import React from 'react';
import uniqueId from 'lodash/uniqueId';

import { Check } from '../Svg';

import './Checkbox.less';

interface Props {
  id?: string;
  value?: boolean;
  className?: string;
  label?: string;
  onChange?: (e) => void;
}

export const Checkbox: React.FC<Props> = ({ value, className, label, onChange }) => {
  const id = uniqueId();

  return (
    <div className={'Checkbox' + (className ? ' Checkbox--' + className : '')}>
      <input className="Checkbox-input" id={'Checkbox-' + id} type="checkbox" onChange={onChange} checked={value} />
      <Check className="Checkbox-helper" />
      <label className="Checkbox-label" htmlFor={'Checkbox-' + id}>
        {label}
      </label>
    </div>
  );
};
