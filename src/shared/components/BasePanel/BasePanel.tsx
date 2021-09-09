import React from 'react';

import './BasePanel.less';

interface Props {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}

const BasePanel: React.FC<Props> = ({ children, className }) => (
  <div className={'BasePanel' + (className ? ' ' + className : '')}>
    <div className="BasePanel-content">{children}</div>
  </div>
);

export default BasePanel;
