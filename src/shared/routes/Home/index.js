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
  FirstLoad: state.FirstLoad,
  Item: state.Item,
  Language: state.Language,
  HomePage: state.HomePage,
  NavigatedRoute: state.NavigatedRoute,
});

export default connect(mapStateToProps)(Home);
