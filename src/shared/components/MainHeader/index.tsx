import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FilterDown from 'Assets/svg/filterDown.svg';
import Span from 'Ui/Span';
import H4 from '../../ui/H4';
import Hr from '../../ui/Hr';

import './MainHeader.less';

interface Props {
  className?: string;
  activeFilter?: string;
  title?: string;
}

const MainHeader: React.FC<Props> = ({ className, activeFilter, title }) => (
  <>
    <div className={(className ? className + ' ' : '') + 'MainHeader'}>
      <H4>{title}</H4>
      <div className="MainHeader-filters">
        <div className="MainHeader-filter">
          <Span className="MainHeader-filterName" bold size="small">
            My vote
          </Span>
          <FilterDown
            className={'MainHeader-filterIcon' + (activeFilter === 'MyVote' ? ' MainHeader-filterIcon--active' : '')}
          />
        </div>
        <div className="MainHeader-filter">
          <Span className="MainHeader-filterName" bold size="small">
            №. votes
          </Span>
          <FilterDown
            className={'MainHeader-filterIcon' + (activeFilter === 'NumberVotes' ? ' MainHeader-filterIcon--active' : '')}
          />
        </div>
        <div className="MainHeader-filter">
          <Span className="MainHeader-filterName" bold size="small">
            Ranking
          </Span>
          <FilterDown
            className={'MainHeader-filterIcon' + (activeFilter === 'Ranking' ? ' MainHeader-filterIcon--active' : '')}
          />
        </div>
      </div>
    </div>
    <Hr type="spacer" size="small" />
  </>
);

const mapStateToProps = createStructuredSelector({
  activeFilter: () => 'MyVote',
});

export default connect(mapStateToProps, {})(MainHeader);
