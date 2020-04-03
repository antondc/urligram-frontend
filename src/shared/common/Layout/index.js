import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from '../../routes/Main';
import Routes from '../../routes/routes';
import { findActiveRoute } from '../../tools/utils';
import actions from '../../redux/actions';
import Cookies, { INVALID } from '../../services/Cookies';

import './Layout.less';

class Layout extends React.Component {
  constructor() {
    this.cookies = new Cookies();
  }

  componentDidUpdate = prevProps => {
    const { logOut } = this.props;

    if (this.props.location !== prevProps.location) {
      const token = this.cookies.getCookie('sessionToken');
      const tokenState = this.cookies.verifyToken(token);
      if (tokenState === INVALID) {
        logOut();
      }
    }
  };

  render = () => {
    const activeRoute = findActiveRoute(this.props.location.pathname, Routes);
    if (isBrowser) {
      window.addEventListener('load', () => {
        document.body.classList.remove('preload'); // Preventing animations on load
        document.body.classList.add('isLoaded'); // Showing page on load
      });
    }

    return (
      <div className={'Layout' + ' Layout--' + this.props.NavigatedRoute.route}>
        {/*
        TODO: find proper place for popups and spinners
        <div className="Layout-popUp">
          <Fade mounted={this.props.Saving.isSaving} time={300}>
            <Loader />
          </Fade>
        </div>
        {global.isIE ? <BrowserPopup /> : null}
        */}
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
  NavigatedRoute: state.NavigatedRoute,
});

export default connect(mapStateToProps, {
  logOut: actions.logOut,
})(Layout);
