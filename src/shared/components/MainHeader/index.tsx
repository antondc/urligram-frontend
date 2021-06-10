import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FilterDown from 'Assets/svg/filterDown.svg';
import { H4, Hr, Span } from 'Vendor/components';

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
          <Span className="MainHeader-filterName" weight="semiBold" size="small">
            My vote
          </Span>
          <FilterDown
            className={'MainHeader-filterIcon' + (activeFilter === 'MyVote' ? ' MainHeader-filterIcon--active' : '')}
          />
        </div>
        <div className="MainHeader-filter">
          <Span className="MainHeader-filterName" weight="semiBold" size="small">
            №. votes
          </Span>
          <FilterDown
            className={
              'MainHeader-filterIcon' + (activeFilter === 'NumberVotes' ? ' MainHeader-filterIcon--active' : '')
            }
          />
        </div>
        <div className="MainHeader-filter">
          <Span className="MainHeader-filterName" weight="semiBold" size="small">
            Ranking
          </Span>
          <FilterDown
            className={'MainHeader-filterIcon' + (activeFilter === 'Ranking' ? ' MainHeader-filterIcon--active' : '')}
          />
        </div>
      </div>
    </div>
    <Hr spacer size="small" />
  </>
);

const mapStateToProps = createStructuredSelector({
  activeFilter: () => 'MyVote',
});

export default connect(mapStateToProps, {})(MainHeader);
