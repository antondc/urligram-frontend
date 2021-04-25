import React, { HTMLProps } from 'react';

import './Ul.less';

interface Props extends HTMLProps<HTMLUListElement> {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const Ul: React.FC<Props> = ({ children, className, ...pros }): JSX.Element => (
  <ul className={'Ul ' + (className ? className : '')} {...pros}>
    {children}
  </ul>
);
