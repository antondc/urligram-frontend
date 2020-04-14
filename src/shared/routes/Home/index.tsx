import React from 'react';
import { connect } from 'react-redux';
import { loadMockDataTwo } from 'Modules/MockDataTwo/actions/loadMockDataTwo';
import { H1, Border, Button, Span } from '@antoniodcorrea/components';
import './Home.less';

interface Props {
  updatedAt: Date;
  loadMockDataTwo: () => void;
}

const Home: React.FC<Props> = ({ updatedAt, loadMockDataTwo }) => {
  return (
    <div className="Home">
      <Border grow>
        <H1>HOME PAGE</H1>
        {updatedAt && <Span>Updated at: {updatedAt}</Span>}
        <Button text="Load Mock Data Two" onClick={loadMockDataTwo} />
      </Border>
    </div>
  );
};

const mapStateToProps = (state) => ({
  updatedAt: state.MockDataTwo.updatedAt,
});

export default connect(mapStateToProps, {
  loadMockDataTwo: loadMockDataTwo,
})(Home);
