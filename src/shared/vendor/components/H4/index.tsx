import React, { HTMLProps } from 'react';

import './H4.less';

interface Props extends HTMLProps<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
  center?: boolean;
}

export const H4: React.SFC<Props> = ({ children, className, grow, center, ...props }) => (
  <h4
    className={(className ? className + ' ' : '') + 'H4' + (grow ? ' H4-grow' : '') + (center ? ' H4-center' : '')}
    {...props}
  >
    {children}
  </h4>
);
