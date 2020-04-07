import React from 'react';
import { connect } from 'react-redux';
import './Home.less';

class Home extends React.Component {
  render() {
    const {
      HomePage: { createdAt },
    } = this.props;

    return (
      <div className="Home">
        <h1 className="NotFound-h1">HOME PAGE</h1>
        {createdAt && <div>{createdAt}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Item: state.Item,
  HomePage: state.HomePage,
});

export default connect(mapStateToProps)(Home);
