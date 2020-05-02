import React from 'react';
import './Border.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  padding?: 'small' | 'normal' | 'big';
  className?: string;
  grow?: boolean;
}

const Border: React.FC<Props> = ({ children, padding = 'normal', grow, className }) => (
  <div
    className={
      (className ? className + ' ' : '') +
      'Border' +
      (padding ? ' Border-' + padding : '') +
      (grow ? ' Border--grow' : '')
    }
  >
    {children}
  </div>
);

export default Border;
