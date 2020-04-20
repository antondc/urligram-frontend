import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Location } from 'history';
import { createStructuredSelector } from 'reselect';
import { SpinnerCircle } from '@antoniodcorrea/components';
import { findActiveRoute } from 'Tools/utils/url';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { selectMockDataTwoLoading } from 'Modules/MockDataTwo/selectors/selectMockDataTwoLoading';
import Fade from 'Common/Fade/Fade';
import { routesList } from 'Routes/index';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Router from 'Routes/Router';

import './Layout.less';

interface Props {
  mockDataTwoLoading: boolean;
  location: Location;
  languageLoading: boolean;
  pushNewRoute: (route) => void;
}

class Layout extends React.Component<Props> {
  componentDidMount() {
    window.addEventListener('load', () => {
      document.body.classList.remove('preload'); // Preventing animations on load
      document.body.classList.add('isLoaded'); // Showing page on load
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location !== prevProps.location) {
      const activeRoute = findActiveRoute({
        path: location.pathname,
        routes: routesList,
        queryString: location.search,
      });
      this.props.pushNewRoute(activeRoute);
    }
  };

  render = () => {
    const { languageLoading, mockDataTwoLoading } = this.props;
    const mounted = !languageLoading;
    const showLoader = mockDataTwoLoading;

    return (
      <div className={'Layout'}>
        <div className="Layout-modal">
          <Fade time={150} mounted={showLoader}>
            <SpinnerCircle />
          </Fade>
        </div>
        <Fade mounted={mounted} time={150}>
          <div className="Layout-content">
            <Header />
            <Route path="/:lang([a-z]{2})?" component={Router} />
            <Footer />
          </div>
        </Fade>
      </div>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  languageLoading: selectLanguageLoading,
  mockDataTwoLoading: selectMockDataTwoLoading,
});

export default connect(mapStateToProps, {
  pushNewRoute,
})(Layout);
