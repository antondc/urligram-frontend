import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Location } from 'history';
import { createStructuredSelector } from 'reselect';
import { SpinnerCircle } from '@antoniodcorrea/components';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { selectMockDataTwoLoading } from '../../redux/modules/MockDataTwo/selectors/selectMockDataTwoLoading';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Main from 'Routes/Main';
import Fade from 'Common/Fade/Fade';
import { findActiveRoute } from '../../tools/utils/url';
import { routesList } from '../../routes/routes';

import './Layout.less';

interface Props {
  mockDataTwoLoading: boolean;
  location: Location;
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
    const { mockDataTwoLoading } = this.props;
    const showLoader = mockDataTwoLoading;

    return (
      <div className={'Layout'}>
        <div className="Layout-modal">
          <Fade time={150} mounted={showLoader}>
            <SpinnerCircle />
          </Fade>
        </div>
        <div className="Layout-content">
          <Header />
          <Route path="/:lang([a-z]{2})?" component={Main} />
          <Footer />
        </div>
      </div>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  mockDataTwoLoading: selectMockDataTwoLoading,
});

export default connect(mapStateToProps, {
  pushNewRoute,
})(Layout);
