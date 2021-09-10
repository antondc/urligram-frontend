import React from 'react';

import './BaseModalFooterSection.less';

interface Props {
  className?: string;
}

export const BaseModalFooterSection: React.FC<Props> = ({ children, className }) => (
  <div className={'BaseModalFooterSection' + (className ? ' ' + className : '')}>{children}</div>
);
