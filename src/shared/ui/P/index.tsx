import React from 'react';
import './P.less';

interface Props {
  children: React.ReactNode;
}

export const P: React.SFC<Props> = ({ children }) => <p className={'P'}>{children}</p>;
