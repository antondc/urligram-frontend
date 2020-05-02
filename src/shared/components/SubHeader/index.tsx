import React from 'react';
import Navigation from 'Components/Navigation';
import Filter from 'Components/Filter';

import './SubHeader.less';

const SubHeader: React.FC = ({}) => (
  <div className="SubHeader">
    <Navigation className="SubHeader-navigation" />
    <Filter className="SubHeader-filter" />
  </div>
);

export default SubHeader;
