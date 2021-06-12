import React from 'react';

import { Hr } from 'Vendor/components';

import './Main.less';

interface Props {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const Main: React.FC<Props> = ({ children, className }) => (
  <main className={'Main ' + (className ? className : '')}>
    {children}
    <Hr spacer size="big" />
  </main>
);

export default Main;
