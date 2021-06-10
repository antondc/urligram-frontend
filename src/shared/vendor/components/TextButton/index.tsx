import React, { HTMLProps } from 'react';

import { Span, SpanSize } from '../Span';
import { SvgIcon } from '../Svg';

import './TextButton.less';

export type TextButtonIcon = 'ArrowRight';

interface Props extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'size'> {
  text: string;
  icon?: TextButtonIcon;
  variant?: boolean;
  disabled?: boolean;
  size?: SpanSize;
}

export const TextButton: React.FC<Props> = ({ text, icon, variant, disabled, size, ...props }): JSX.Element => (
  <button
    className={'TextButton ' + (variant ? ' TextButton--' + variant : '') + (disabled ? ' TextButton--disabled' : '')}
    {...props}
  >
    <Span size={size} className="TextButton-text" weight="semiBold">
      {text}
    </Span>
    {icon && <SvgIcon name={icon} size="small" className="TextButton-icon" />}
  </button>
);
