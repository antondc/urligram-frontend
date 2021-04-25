import React, { HTMLProps } from 'react';

import './H1.less';

interface Props extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
  center?: boolean;
}

export const H1: React.SFC<Props> = ({ children, className, grow, center, ...props }) => (
  <h1
    className={(className ? className + ' ' : '') + 'H1' + (grow ? ' H1-grow' : '') + (center ? ' H1-center' : '')}
    {...props}
  >
    {children}
  </h1>
);
