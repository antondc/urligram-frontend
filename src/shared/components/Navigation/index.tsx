import React from 'react';

import Border from 'Ui/Border';
import Span from 'Ui/Span';
import { A } from '@antoniodcorrea/components';

import './Navigation.less';

interface Props {
  className?: string;
}

const Navigation: React.FC<Props> = ({ className }) => (
  <Border className={(className ? className + ' ' : '') + 'Navigation'}>
    <A className="Navigation-page" href="" styled frontend>
      <Span bold>Page</Span>
    </A>
    <Span className="Navigation-spacer">▸</Span>
    <A className="Navigation-subPage" href="" styled frontend>
      <Span bold>SubPage</Span>
    </A>
    <Span className="Navigation-spacer">▸</Span>
    <A className="Navigation-item" href="" styled frontend>
      <Span bold>Item</Span>
    </A>
  </Border>
);

export default Navigation;
