import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from '../../routes/Main';
import Routes from '../../routes/routes';
import { findActiveRoute } from '../../tools/utils/utils';

import './Layout.less';

class Layout extends React.Component {
  render = () => {
    const activeRoute = findActiveRoute(this.props.location.pathname, Routes);
    if (isBrowser) {
      window.addEventListener('load', () => {
        document.body.classList.remove('preload'); // Preventing animations on load
        document.body.classList.add('isLoaded'); // Showing page on load
      });
    }

    return (
      <div className={'Layout'}>
        <Header activeRoute={activeRoute} />
        <Route
          path="/:lang([a-z]{2})?"
          render={props => {
            return <Main data={this.props.data} {...props} />;
          }}
        />
        <Footer />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  Saving: state.Saving,
});

export default connect(mapStateToProps)(Layout);
