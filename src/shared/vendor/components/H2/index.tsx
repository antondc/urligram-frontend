import React, { HTMLProps } from 'react';

import './H2.less';

interface Props extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
  center?: boolean;
}

export const H2: React.SFC<Props> = ({ children, className, grow, center, ...props }) => (
  <h2
    className={(className ? className + ' ' : '') + 'H2' + (grow ? ' H2-grow' : '') + (center ? ' H2-center' : '')}
    {...props}
  >
    {children}
  </h2>
);
