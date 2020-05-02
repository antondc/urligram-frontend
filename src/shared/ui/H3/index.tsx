import React from 'react';
import './H3.less';

interface Props {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
  center?: boolean;
}

const H3: React.SFC<Props> = ({ children, className, grow, center }) => (
  <h3 className={(className ? className + ' ' : '') + 'H3' + (grow ? ' H3-grow' : '') + (center ? ' H3-center' : '')}>
    {children}
  </h3>
);

export default H3;
