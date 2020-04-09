import React from 'react';
import { connect } from 'react-redux';
import { loadMockDataTwo } from '../../redux/modules/MockDataTwo/actions/loadMockDataTwo';

import './Home.less';

interface Props {
  createdAt: Date;
  loadMockDataTwo: () => void;
}

const Home: React.FC<Props> = ({ createdAt, loadMockDataTwo }) => (
  <div className="Home">
    <h1 className="Home-h1">HOME PAGE</h1>
    {createdAt && <div>{createdAt}</div>}
    <button className="Home-button" onClick={loadMockDataTwo}>
      Load Mock Data Two
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  createdAt: state.MockDataOne.createdAt,
});

export default connect(mapStateToProps, {
  loadMockDataTwo: loadMockDataTwo,
})(Home);
