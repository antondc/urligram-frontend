import React from 'react';

import './Border.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  padding?: 'small' | 'normal' | 'big';
  className?: string;
  grow?: boolean;
  onClick?: (any) => void;
  onMouseLeave?: (any) => void;
}

const Border: React.FC<Props> = ({ children, padding = 'normal', grow, className, onClick, onMouseLeave }) => (
  <div
    className={
      (className ? className + ' ' : '') +
      'Border' +
      (padding ? ' Border-' + padding : '') +
      (grow ? ' Border--grow' : '')
    }
    onClick={onClick}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
);

export default Border;
