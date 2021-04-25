import React, { HTMLProps } from 'react';
import uniqueId from 'lodash/uniqueId';

import { Hr } from '../Hr';
import { Span } from '../Span';
import { Check, Cross } from '../Svg';

import './Range.less';

interface Props extends HTMLProps<HTMLInputElement> {
  name: string;
  value?: string | number;
  label?: string;
  min?: number;
  max?: number;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  grow?: boolean;
  onChange: (e) => void;
}

export const Range: React.FC<Props> = ({
  name,
  value,
  label,
  min,
  max,
  error,
  success,
  disabled,
  grow,
  onChange,
  ...props
}) => {
  const id = uniqueId();
  const valueInitial: number = max / 2;
  const reachedMax: boolean = value === max.toString();
  const reachedMin: boolean = value === min.toString();
  let valueToDisplay: number | React.ReactNode;

  if (!value) {
    valueToDisplay = Math.floor(valueInitial);
  } else if (reachedMax) {
    valueToDisplay = <Check className="Range-icon" />;
  } else if (reachedMin) {
    valueToDisplay = <Cross className="Range-icon" />;
  } else {
    valueToDisplay = value;
  }

  return (
    <div
      className={
        'Range' +
        (error ? ' Range--error' : '') +
        (success ? ' Range--success' : '') +
        (disabled ? ' Range--disabled' : '') +
        (grow ? ' Range--grow' : '') +
        (reachedMax ? ' Range--max' : '')
      }
    >
      {label && (
        <>
          <label className="Range-label" htmlFor={'Range-' + id}>
            <Span bold> {label}</Span>
          </label>
          <Hr spacer size="micro" />
        </>
      )}
      <div className="Range-fields">
        <div className="Range-value">{valueToDisplay}</div>
        <input
          name={name}
          className="Range-input"
          type="range"
          min={min}
          disabled={disabled}
          max={max}
          value={value}
          onChange={onChange}
          id={'Range-' + id}
          {...props}
        />
      </div>
    </div>
  );
};
