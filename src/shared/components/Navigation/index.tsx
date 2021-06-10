import React from 'react';

import A from 'Components/A';
import { Frame, Span } from 'Vendor/components';

import './Navigation.less';

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }) => (
  <Frame className={(className ? className + ' ' : '') + 'Navigation'}>
    <A className="Navigation-page" href="" styled frontend>
      <Span weight="semiBold">Page</Span>
    </A>
    <Span className="Navigation-spacer">▸</Span>
    <A className="Navigation-subPage" href="" styled frontend>
      <Span weight="semiBold">SubPage</Span>
    </A>
    <Span className="Navigation-spacer">▸</Span>
    <A className="Navigation-item" href="" styled frontend>
      <Span weight="semiBold">Item</Span>
    </A>
  </Frame>
);

export default Navigation;
