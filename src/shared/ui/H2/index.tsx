import React from 'react';
import './H2.less';

interface Props {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
  center?: boolean;
}

const H2: React.SFC<Props> = ({ children, className, grow, center }) => (
  <h2 className={(className ? className + ' ' : '') + 'H2' + (grow ? ' H2-grow' : '') + (center ? ' H2-center' : '')}>
    {children}
  </h2>
);

export default H2;
