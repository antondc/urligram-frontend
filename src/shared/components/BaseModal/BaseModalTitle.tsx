import React from 'react';

import './BaseModalTitle.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const BaseModalTitle: React.FC<Props> = ({ children, className }) => (
  <h3 className={'BaseModalTitle' + (className ? ' ' + className : '')}>{children}</h3>
);
