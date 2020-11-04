import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Location } from 'history';

import Background from 'Assets/svg/background.svg';
import LayoutHelper from 'Common/LayoutHelper';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import LoginModal from 'Components/LoginModal';
import ModalMessage from 'Components/ModalMessage';
import SubHeader from 'Components/SubHeader';
import UserModal from 'Components/UserModal';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { selectMockDataTwoLoading } from 'Modules/MockDataTwo/selectors/selectMockDataTwoLoading';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectUiLoginModalMounted } from 'Modules/Ui/selectors/selectUiLoginModalMounted';
import { selectUiMessageModalMounted } from 'Modules/Ui/selectors/selectUiMessageModalMounted';
import { selectUiUserModalMounted } from 'Modules/Ui/selectors/selectUiUserModalMounted';
import { selectUiScreenLocked } from 'Root/src/shared/redux/modules/Ui/selectors/selectUiScreenLocked';
import { routesList, routesWithoutOmmitedValues } from 'Routes/index';
import Router from 'Routes/Router';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';
import Fade from 'Ui/Fade';
import Hr from 'Ui/Hr';
import SpinnerCircle from 'Ui/SpinnerCircle';
import LayoutContent from '../LayoutContent';

import './Layout.less';

interface Props {
  mockDataTwoLoading: boolean;
  location: Location;
  languageLoading: boolean;
  userModalMounted: boolean;
  messageModalMounted: boolean;
  loginModalMounted: boolean;
  uiScreenLocked: boolean;
  isLogged: boolean;
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
    const { uiScreenLocked, location } = this.props;

    if (location !== prevProps.location) {
      const activeRouteKey = findActiveRouteKey({
        urlPath: location.pathname,
        routes: routesList,
      });
      const enhancedRoute = enhanceRouteWithParams({
        route: routesWithoutOmmitedValues[activeRouteKey],
        location,
      });
      this.props.pushNewRoute(enhancedRoute);
    }

    // Lock screen on Modal mount
    if (uiScreenLocked) {
      document.body.classList.add('scrollLocked');
    } else {
      document.body.classList.remove('scrollLocked');
    }
  };

  render = () => {
    const {
      languageLoading,
      mockDataTwoLoading,
      userModalMounted,
      messageModalMounted,
      loginModalMounted,
    } = this.props;

    const mounted = !languageLoading;
    const showLoader = mockDataTwoLoading;

    return (
      <div className="Layout">
        <Fade mounted={mounted} unmountOnExit={false} speed="fast">
          <Background className="Layout-background" />
          <LayoutContent>
            <div className="Layout-top">
              <Header />
              <Hr type="spacer" />
              <SubHeader />
              <Hr type="spacer" />
              <Route path="/:lang([a-z]{2})?" component={Router} />
              <Hr type="spacer" />
            </div>
            <LayoutHelper />
            <Footer />
            <Fade mounted={userModalMounted} position="absolute">
              <UserModal />
            </Fade>
          </LayoutContent>
          <Fade mounted={showLoader} speed="fastest" position="fixed">
            <SpinnerCircle />
          </Fade>
          <Fade mounted={messageModalMounted} speed="fastest" position="fixed">
            <ModalMessage message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida augue sed ipsum pulvinar, vel pretium tellus commodo. Aliquam erat volutpat. Morbi placerat justo massa, eget laoreet enim cursus et. Aliquam id scelerisque ipsum, ac rutrum erat. Donec sed blandit metus. Maecenas pellentesque, neque vel " />
          </Fade>
          <Fade mounted={loginModalMounted} speed="fastest" position="fixed">
            <LoginModal />
          </Fade>
        </Fade>
      </div>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  languageLoading: selectLanguageLoading,
  mockDataTwoLoading: selectMockDataTwoLoading,
  userModalMounted: selectUiUserModalMounted,
  messageModalMounted: selectUiMessageModalMounted,
  uiScreenLocked: selectUiScreenLocked,
  loginModalMounted: selectUiLoginModalMounted,
  isLogged: selectSessionLoggedIn,
});

export default connect(mapStateToProps, {
  pushNewRoute,
})(Layout);
