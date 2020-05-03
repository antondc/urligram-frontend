import React from 'react';

import './LayoutContent.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const LayoutContent: React.FC<Props> = ({ children, className }) => (
  <div className={(className ? className + ' ' : '') + 'LayoutContent'}>{children}</div>
);

export default LayoutContent;
