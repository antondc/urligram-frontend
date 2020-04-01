import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/Header/HeaderUi';
import Footer from '../../components/Footer/Footer';
import Main from '../../routes/Main/MainConnect';
import Routes from '../../routes/routes';
import { findActiveRoute } from '../../tools/utils';

import './App.less';

class AppUi extends React.Component {
  // TODO: Rename this as Layout??
  render() {
    const activeRoute = findActiveRoute(this.props.location.pathname, Routes);
    if (isBrowser) {
      window.addEventListener('load', () => {
        document.body.classList.remove('preload'); // Preventing animations on load
        document.body.classList.add('isLoaded'); // Showing page on load
      });
    }

    return (
      <div className={'App' + ' App--' + this.props.NavigatedRoute.route}>
        {/*
        TODO: find proper place for popups and spinners
        <div className="App-popUp">
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
  }
}

export default AppUi;
