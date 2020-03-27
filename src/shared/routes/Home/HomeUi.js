import React from 'react';
import { withCookies } from 'react-cookie';
import WithAuth from '../../common/WithAuth/WithAuth';
import './Home.less';

class HomeUi extends React.Component {
  render() {
    if (this.props.HomePage.HomePageTranslations) return;
    return (
      <div className="Home">
        <h1 className="NotFound-h1">HOME PAGE</h1>
      </div>
    );
  }
}

export default withCookies(WithAuth(HomeUi));
