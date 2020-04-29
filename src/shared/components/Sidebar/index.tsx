import React from 'react';
import { Border, Flex } from '@antoniodcorrea/components';

import './Sidebar.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Sidebar: React.FC<Props> = ({ children }) => (
  <Border className="Sidebar">
    <Flex horizontal="center" vertical="top">
      {children}
    </Flex>
  </Border>
);

export default Sidebar;
