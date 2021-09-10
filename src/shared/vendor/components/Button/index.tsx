import React, { HTMLProps } from 'react';

import ArrowRight from 'Assets/svg/arrowRight.svg';
import { SpinnerPie } from '../SpinnerPie';

import './Button.less';

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
  size?: 'normal' | 'small';
}

export const Button: React.FC<Props> = ({
  className,
  text,
  success,
  error,
  disabled,
  loading,
  arrow,
  grow,
  type = 'button',
  size = 'normal',
  ...props
}): JSX.Element => (
  <button
    className={
      'Button' +
      (className ? ' ' + className : '') +
      (size ? ' Button--' + size : '') +
      (grow ? ' Button--grow' : '') +
      (!disabled && !error && success ? ' Button--success' : '') +
      (!disabled && !error && loading ? ' Button--loading' : '') +
      (disabled ? ' Button--disabled' : '') +
      (error ? ' Button--error' : '')
    }
    type={type}
    disabled={!!disabled || !!error}
    {...props}
  >
    <span className="Button-text">{text}</span>
    {arrow && <ArrowRight className="Button-arrow" />}
    {!disabled && !error && <SpinnerPie className="Button-loader" />}
  </button>
);
