import React from 'react';
import './H4.less';

interface Props {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
  center?: boolean;
}

const H4: React.SFC<Props> = ({ children, className, grow, center }) => (
  <h4 className={(className ? className + ' ' : '') + 'H4' + (grow ? ' H4-grow' : '') + (center ? ' H4-center' : '')}>
    {children}
  </h4>
);

export default H4;
