import React from 'react';
import './H1.less';

interface Props {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
  center?: boolean;
}

const H1: React.SFC<Props> = ({ children, className, grow, center }) => (
  <h1 className={(className ? className + ' ' : '') + 'H1' + (grow ? ' H1-grow' : '') + (center ? ' H1-center' : '')}>
    {children}
  </h1>
);

export default H1;
