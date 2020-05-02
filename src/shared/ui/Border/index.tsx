import React from 'react';
import './Border.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  padding?: 'small' | 'normal' | 'big';
  className?: string;
  grow?: boolean;
}

export const Border: React.FC<Props> = ({ children, padding = 'normal', grow, className }) => (
  <div
    className={
      'Border' +
      (padding ? ' Border-' + padding : '') +
      (grow ? ' Border--grow' : '') +
      (className ? ' ' + className : '')
    }
  >
    {children}
  </div>
);
