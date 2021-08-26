import React, { HTMLProps } from 'react';

import { Span } from '../Span';
import { SpinnerPie } from '../SpinnerPie';
import { IconsType, SvgIcon } from '../Svg';

import './Button.less';

interface Props extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  className?: string;
  text: string;
  size?: 'small' | 'medium' | 'big';
  variant?: 'alternate' | 'delete';
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconsType;
  grow?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<Props> = ({
  className,
  text,
  size = 'medium',
  variant,
  success,
  error,
  disabled,
  loading,
  icon,
  grow,
  type = 'button',
  ...props
}): JSX.Element => (
  <button
    className={
      'Button' +
      (className ? ' ' + className : '') +
      (size ? ' Button--' + size : '') +
      (variant ? ' Button-variant--' + variant : '') +
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
    <div className="Button-shadow" />
    <Span className="Button-content" weight="semiBold" uppercase>
      {text}
      {icon && <SvgIcon name={icon} size="small" className="Button-svg" />}
      {!disabled && !error && (
        <div className="Button-loader">
          <SpinnerPie size="small" />
        </div>
      )}
    </Span>
  </button>
);
