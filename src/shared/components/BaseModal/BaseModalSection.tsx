import React from 'react';

import './BaseModalSection.less';

interface Props {
  className?: string;
}

export const BaseModalSection: React.FC<Props> = ({ children, className }) => (
  <div className={'BaseModalSection' + (className ? ' ' + className : '')}>{children}</div>
);
