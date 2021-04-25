import React, { HTMLProps } from 'react';

import { Span } from '../Span';
import { SvgIcon } from '../Svg';

import './TextButton.less';

export type TextButtonIcon = 'ArrowRight';

interface Props extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
  text: string;
  icon: TextButtonIcon;
  variant?: boolean;
  disabled?: boolean;
}

export const TextButton: React.FC<Props> = ({ text, icon, variant, disabled, ...props }): JSX.Element => (
  <button
    className={'TextButton ' + (variant ? ' TextButton--' + variant : '') + (disabled ? ' TextButton--disabled' : '')}
    {...props}
  >
    <Span className="TextButton-text" bold>
      {text}
    </Span>
    {<SvgIcon name={icon} size="small" className="TextButton-icon" />}
  </button>
);
