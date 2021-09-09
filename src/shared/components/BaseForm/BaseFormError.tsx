import React from 'react';

import './BaseFormError.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const BaseFormError: React.FC<Props> = ({ children, className }) => (
  <div className={'BaseFormError' + (className ? ' ' + className : '')}>{children}</div>
);
