import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Border from 'Ui/Border';
import Span from 'Ui/Span';
import FilterDown from 'Assets/svg/filterDown.svg';

import './Filter.less';

interface Props {
  className?: string;
  activeFilter?: string;
}

const Filter: React.FC<Props> = ({ className, activeFilter }) => (
  <Border className={(className ? className + ' ' : '') + 'Filter'}>
    <Span className="Filter-filter" bold size="small">
      My vote
    </Span>
    {activeFilter === 'MyVote' && <FilterDown className="Filter-icon" />}
    <Span className="Filter-filter" bold size="small">
      Number of votes
    </Span>
    {activeFilter === 'Number of votes' && <FilterDown className="Filter-icon" />}
    <Span className="Filter-filter" bold size="small">
      Ranking
    </Span>
    {activeFilter === 'Ranking' && <FilterDown className="Filter-icon" />}
  </Border>
);

const mapStateToProps = createStructuredSelector({
  activeFilter: () => 'MyVote',
});

export default connect(mapStateToProps, {})(Filter);
