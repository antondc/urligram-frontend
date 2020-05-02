import React from 'react';
import Border from 'Ui/Border';
import Span from 'Ui/Span';
import A from 'Ui/A';

import './Navigation.less';

const Navigation: React.FC = () => (
  <Border className="Navigation">
    <A className="Navigation-page" href="" styled>
      <Span bold>Page</Span>
    </A>
    <Span className="Navigation-spacer">▸</Span>
    <A className="Navigation-subPage" href="" styled>
      <Span bold>SubPage</Span>
    </A>
    <Span className="Navigation-spacer">▸</Span>
    <A className="Navigation-item" href="" styled>
      <Span bold>Item</Span>
    </A>
  </Border>
);

export default Navigation;
