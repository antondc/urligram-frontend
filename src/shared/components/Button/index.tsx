import React from 'react';

import './Button.less';

interface Props {
  children: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<Props> = ({ children, onClick, type }) => (
  <button className="Button" onClick={onClick} type={type}>
    {children}
  </button>
);

export default Button;
