import React from 'react';

import './BaseFormLabel.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const BaseFormLabel: React.FC<Props> = ({ children, className }) => (
  <div className={'BaseFormLabel' + (className ? ' ' + className : '')}>{children}</div>
);
