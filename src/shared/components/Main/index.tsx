import React from 'react';

import './Main.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const Main: React.FC<Props> = ({ children, className }) => (
  <div className={'Main' + (className ? ` ${className}` : '')}>{children}</div>
);

export default Main;
