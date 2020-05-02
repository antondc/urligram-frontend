import React from 'react';
import Span from '../Span';
import SvgIcon from '../Svg';
import './TextButton.less';

export type TextButtonIcon = 'ArrowRight';

interface Props {
  text: string;
  icon: TextButtonIcon;
  variant?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const TextButton: React.FC<Props> = ({ text, icon, variant, disabled, onClick }): JSX.Element => (
  <button
    className={'TextButton ' + (variant ? ' TextButton--' + variant : '') + (disabled ? ' TextButton--disabled' : '')}
    onClick={onClick}
  >
    <Span className="TextButton-text" bold>
      {text}
    </Span>
    {<SvgIcon name={icon} size="small" className="TextButton-icon" />}
  </button>
);

export default TextButton;
