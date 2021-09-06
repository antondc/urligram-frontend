import React, { HTMLProps } from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
import { SpinnerPie } from '../SpinnerPie';

import './Button2.less';

interface Props extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  className?: string;
  text: string;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  loading?: boolean;
  arrow?: boolean;
  grow?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button2: React.FC<Props> = ({
  className,
  text,
  success,
  error,
  disabled,
  loading,
  arrow,
  grow,
  type = 'button',
  ...props
}): JSX.Element => (
  <button
    className={
      'Button2' +
      (className ? ' ' + className : '') +
      (grow ? ' Button2--grow' : '') +
      (!disabled && !error && success ? ' Button2--success' : '') +
      (!disabled && !error && loading ? ' Button2--loading' : '') +
      (disabled ? ' Button2--disabled' : '') +
      (error ? ' Button2--error' : '')
    }
    type={type}
    disabled={!!disabled || !!error}
    {...props}
  >
    <span className="Button2-text">{text}</span>
    {arrow && <ArrowRight className="Button2-arrow" />}
    {!disabled && !error && <SpinnerPie className="Button2-loader" />}
  </button>
);
