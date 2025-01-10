import React, { HTMLProps } from 'react';

import './CustomTag.less';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  children: string | React.ReactNode | React.ReactNode[];
  className?: string;
}

export const CustomTag: React.FC<Props> = ({ children, className, ...props }) => (
  <div className={'CustomTag ' + (className ? ' ' + className : '')} {...props}>
    {children}
  </div>
);
