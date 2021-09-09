import React from 'react';

import './BaseModalFooter.less';

interface Props {
  className?: string;
}

export const BaseModalFooter: React.FC<Props> = ({ children, className }) => (
  <div className={'BaseModalFooter' + (className ? ' ' + className : '')}>{children}</div>
);
