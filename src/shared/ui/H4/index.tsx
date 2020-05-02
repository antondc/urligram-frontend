import React from 'react';
import './H4.less';

interface Props {
  children: React.ReactNode;
  grow?: boolean;
  center?: boolean;
}

export const H4: React.SFC<Props> = ({ children, grow, center }) => (
  <h4 className={'H4' + (grow ? ' H4-grow' : '') + (center ? ' H4-center' : '')}>{children}</h4>
);
