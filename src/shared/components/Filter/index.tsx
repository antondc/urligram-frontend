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
    <div className="Filter-filter">
      <Span className="Filter-filterName" bold size="small">
        My vote
      </Span>
      <FilterDown className={'Filter-filterIcon' + (activeFilter === 'MyVote' ? ' Filter-filterIcon--active' : '')} />
    </div>
    <div className="Filter-filter">
      <Span className="Filter-filterName" bold size="small">
        №. votes
      </Span>
      <FilterDown
        className={'Filter-filterIcon' + (activeFilter === 'NumberVotes' ? ' Filter-filterIcon--active' : '')}
      />
    </div>
    <div className="Filter-filter">
      <Span className="Filter-filterName" bold size="small">
        Ranking
      </Span>
      <FilterDown className={'Filter-filterIcon' + (activeFilter === 'Ranking' ? ' Filter-filterIcon--active' : '')} />
    </div>
  </Border>
);

const mapStateToProps = createStructuredSelector({
  activeFilter: () => 'MyVote',
});

export default connect(mapStateToProps, {})(Filter);
