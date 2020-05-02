import React from 'react';
import './H1.less';

interface Props {
  children: React.ReactNode;
  grow?: boolean;
  center?: boolean;
}

export const H1: React.SFC<Props> = ({ children, grow, center }) => (
  <h1 className={'H1' + (grow ? ' H1-grow' : '') + (center ? ' H1-center' : '')}>{children}</h1>
);
