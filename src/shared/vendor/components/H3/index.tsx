import React, { HTMLProps } from 'react';

import './H3.less';

interface Props extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
  center?: boolean;
}

export const H3: React.SFC<Props> = ({ children, className, grow, center, ...props }) => (
  <h3
    className={(className ? className + ' ' : '') + 'H3' + (grow ? ' H3-grow' : '') + (center ? ' H3-center' : '')}
    {...props}
  >
    {children}
  </h3>
);
