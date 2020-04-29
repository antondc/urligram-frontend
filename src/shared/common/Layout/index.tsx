import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Location } from 'history';
import { createStructuredSelector } from 'reselect';
import { SpinnerCircle, Fade, Hr } from '@antoniodcorrea/components';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { selectMockDataTwoLoading } from 'Modules/MockDataTwo/selectors/selectMockDataTwoLoading';
import { routesList, routesWithoutOmmitedValues } from 'Routes/index';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import LayoutHelper from 'Common/LayoutHelper';
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
      const activeRouteKey = findActiveRouteKey({
        urlPath: location.pathname,
        routes: routesList,
      });
      const enhancedRoute = enhanceRouteWithParams({
        route: routesWithoutOmmitedValues[activeRouteKey],
        urlPath: location.pathname,
        queryString: location.search,
      });
      this.props.pushNewRoute(enhancedRoute);
    }
  };

  render = () => {
    const { languageLoading, mockDataTwoLoading } = this.props;
    const mounted = !languageLoading;
    const showLoader = mockDataTwoLoading;

    return (
      <div className="Layout">
        <LayoutHelper />
        <Fade mounted={mounted} speed="fast">
          <div className="Layout-content">
            <div className="Layout-top">
              <Header />
              <Hr type="spacer" />
              <Route path="/:lang([a-z]{2})?" component={Router} />
              <Hr type="spacer" />
            </div>
            <Footer />
          </div>
          <div className="Layout-modal">
            <Fade speed="fast" mounted={showLoader}>
              <SpinnerCircle />
            </Fade>
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
