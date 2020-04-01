import React from 'react';
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

export default HomeUi;
