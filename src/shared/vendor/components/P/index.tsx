import React, { HTMLProps } from 'react';

import './P.less';

interface Props extends HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const P: React.FC<Props> = ({ children, ...props }) => (
  <p className={'P'} {...props}>
    {children}
  </p>
);
