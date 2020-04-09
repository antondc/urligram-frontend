import React from 'react';
import { connect } from 'react-redux';
import { loadMockDataTwo } from '../../redux/modules/MockDataTwo/actions/loadMockDataTwo';
import Button from '../../components/Button';

import './Home.less';

interface Props {
  createdAt: Date;
  loadMockDataTwo: () => void;
}

const Home: React.FC<Props> = ({ createdAt, loadMockDataTwo }) => (
  <div className="Home">
    <h1 className="Home-h1">HOME PAGE</h1>
    {createdAt && <div>Date retrieved from SSR: {createdAt}</div>}
    <Button onClick={loadMockDataTwo}>Load Mock Data Two</Button>
  </div>
);

const mapStateToProps = (state) => ({
  createdAt: state.MockDataOne.createdAt,
});

export default connect(mapStateToProps, {
  loadMockDataTwo: loadMockDataTwo,
})(Home);
