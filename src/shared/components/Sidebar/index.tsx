import React from 'react';

import './Sidebar.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Sidebar: React.FC<Props> = ({ children }) => <aside className="Sidebar">{children}</aside>;

export default Sidebar;
