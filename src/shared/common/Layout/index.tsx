import React from 'react';
import { Route, matchPath } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { selectLanguageLoading } from '../../redux/modules/Languages/selectors/selectLanguageLoading';
import { selectMockDataTwoLoading } from '../../redux/modules/MockDataTwo/selectors/selectMockDataTwoLoading';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Main from 'Routes/Main';
import Fade from 'Common/Fade/Fade';
import { SpinnerCircle } from '@antoniodcorrea/components';
import './Layout.less';
import { findActiveRouteForState } from '../../tools/utils/url';
import Routes from '../../routes/routes';

interface Props {
  languagesLoading: boolean;
  mockDataTwoLoading: boolean;
  location: any;
  pushNewRoute: (route) => void;
}

class Layout extends React.Component<Props> {
  componentDidMount() {
    window.addEventListener('load', () => {
      document.body.classList.remove('preload'); // Preventing animations on load
      document.body.classList.add('isLoaded'); // Showing page on load
    });
    const activeRoute = findActiveRouteForState(location.pathname, Routes);
    this.props.pushNewRoute(activeRoute);
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.location !== prevProps.location) {
      const activeRoute = findActiveRouteForState(location.pathname, Routes);
      this.props.pushNewRoute(activeRoute);
    }
  };

  render = () => {
    const { languagesLoading, mockDataTwoLoading } = this.props;
    const showLoader = languagesLoading || mockDataTwoLoading;

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
  languagesLoading: selectLanguageLoading,
  mockDataTwoLoading: selectMockDataTwoLoading,
});

export default connect(mapStateToProps, {
  pushNewRoute,
})(Layout);
