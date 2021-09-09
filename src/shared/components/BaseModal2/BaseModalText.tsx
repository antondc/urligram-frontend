import React from 'react';

import './BaseModalText.less';

interface Props {
  className?: string;
}

export const BaseModalText: React.FC<Props> = ({ children, className }) => (
  <p className={'BaseModalText' + (className ? ' ' + className : '')}>{children}</p>
);
