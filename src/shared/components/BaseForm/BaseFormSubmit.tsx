import React from 'react';

import './BaseFormSubmit.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const BaseFormSubmit: React.FC<Props> = ({ children, className }) => (
  <div className={'BaseFormSubmit' + (className ? ' ' + className : '')}>{children}</div>
);
