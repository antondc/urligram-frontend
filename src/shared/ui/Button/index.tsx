import React from 'react';
import Span from '../Span';
import SvgIcon, { IconsType } from '../Svg';

import './Button.less';

interface Props {
  text: string;
  size?: 'small' | 'medium' | 'big';
  variant?: 'alternate';
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  icon?: IconsType;
  grow?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (value) => void;
}

const Button: React.FC<Props> = ({
  text,
  size = 'medium',
  variant,
  success,
  error,
  disabled,
  icon,
  grow,
  onClick,
  type = 'button',
}): JSX.Element => {
  return (
    <button
      className={
        'Button ' +
        (size ? 'Button--' + size : '') +
        (variant ? ' Button--' + variant : '') +
        (grow ? ' Button--grow' : '') +
        (success ? ' Button--success' : '') +
        (error ? ' Button--error' : '') +
        (disabled ? ' Button--disabled' : '')
      }
      onClick={onClick}
      type={type}
    >
      <Span className="Button-content" bold uppercase>
        {text}
        {icon && <SvgIcon name={icon} size="small" className="Button-svg" />}
      </Span>
    </button>
  );
};

export default Button;
