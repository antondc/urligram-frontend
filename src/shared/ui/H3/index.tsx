import React from 'react';
import './H3.less';

interface Props {
  children: React.ReactNode;
  grow?: boolean;
  center?: boolean;
}

const H3: React.SFC<Props> = ({ children, grow, center }) => (
  <h3 className={'H3' + (grow ? ' H3-grow' : '') + (center ? ' H3-center' : '')}>{children}</h3>
);

export default H3;
