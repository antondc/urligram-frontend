import React from 'react';

import { Hr } from 'Vendor/components';

import './MainContent.less';

const MainContent: React.FC = ({ children }) => (
  <div className="MainContent">
    <Hr spacer size="small" />
    {children}
    <Hr spacer size="small" />
  </div>
);

export default MainContent;
