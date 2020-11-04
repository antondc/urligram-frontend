import React from 'react';

import Border from 'Ui/Border';

import './Main.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Main: React.FC<Props> = ({ children }) => <Border className="Main">{children}</Border>;

export default Main;
