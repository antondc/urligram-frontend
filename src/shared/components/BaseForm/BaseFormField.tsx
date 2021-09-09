import React from 'react';

import './BaseFormField.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const BaseFormField: React.FC<Props> = ({ children, className }) => (
  <div className={'BaseFormField' + (className ? ' ' + className : '')}>{children}</div>
);
