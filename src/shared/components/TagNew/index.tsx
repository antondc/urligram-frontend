import React, { HTMLProps } from 'react';

import './TagNew.less';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  children: string | React.ReactNode | React.ReactNode[];
  className?: string;
}

export const TagNew: React.FC<Props> = ({ children, className, ...props }) => (
  <div className={'TagNew ' + (className ? ' ' + className : '')} {...props}>
    {children}
  </div>
);
