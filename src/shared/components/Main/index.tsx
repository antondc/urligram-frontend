import React from 'react';

import './Main.less';

interface Props {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const Main: React.FC<Props> = ({ children, className }) => (
  <div className={'Main ' + (className ? className : '')}>{children}</div>
);

export default Main;
