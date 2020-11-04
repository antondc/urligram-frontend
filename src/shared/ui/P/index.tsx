import React from 'react';

import './P.less';

interface Props {
  children: React.ReactNode;
}

const P: React.SFC<Props> = ({ children }) => <p className={'P'}>{children}</p>;

export default P;
