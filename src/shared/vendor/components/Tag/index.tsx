import React, { HTMLProps } from 'react';

import './Tag.less';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'size'> {
  children: string | React.ReactNode | React.ReactNode[];
  className?: string;
}

export const Tag: React.FC<Props> = ({ children, className, ...props }) => (
  <div className={'Tag ' + (className ? ' ' + className : '')} {...props}>
    {children}
  </div>
);
