import React from 'react';

import { Border } from '@antoniodcorrea/components';

import './Main.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Main: React.FC<Props> = ({ children }) => <Border className="Main">{children}</Border>;

export default Main;
