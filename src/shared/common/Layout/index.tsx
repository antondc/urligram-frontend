import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Location } from 'history';
import { createStructuredSelector } from 'reselect';
import SpinnerCircle from 'Ui/SpinnerCircle';
import Fade from 'Ui/Fade';
import Hr from 'Ui/Hr';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { selectMockDataTwoLoading } from 'Modules/MockDataTwo/selectors/selectMockDataTwoLoading';
import { selectuiUserModalMounted } from 'Modules/Ui/selectors/selectUiUserModalMounted';
import { selectUiLoginModalMounted } from 'Modules/Ui/selectors/selectUiLoginModalMounted';
import { selectuiMessageModalMounted } from 'Modules/Ui/selectors/selectUiMessageModalMounted';
import { selectUiAnyModalMounted } from 'Root/src/shared/redux/modules/Ui/selectors/selectUiAnyModalMounted';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { routesList, routesWithoutOmmitedValues } from 'Routes/index';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import SubHeader from 'Components/SubHeader';
import Background from 'Assets/svg/background.svg';
import LayoutHelper from 'Common/LayoutHelper';
import Router from 'Routes/Router';
import UserModal from 'Components/UserModal';
import ModalMessage from 'Components/ModalMessage';
import LoginModal from 'Components/LoginModal';
import LayoutContent from '../LayoutContent';

import './Layout.less';

interface Props {
  mockDataTwoLoading: boolean;
  location: Location;
  languageLoading: boolean;
  userModalMounted: boolean;
  messageModalMounted: boolean;
  loginModalMounted: boolean;
  anyModalMounted: boolean;
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
    const { anyModalMounted } = this.props;

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

    // Lock screen on Modal mount
    if (anyModalMounted) {
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
      isLogged,
    } = this.props;
    const mounted = !languageLoading;
    const showLoader = mockDataTwoLoading;

    return (
      <div className="Layout">
        <Background className="Layout-background" />
        <Fade mounted={mounted}>
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
            <Fade mounted={userModalMounted}>
              <UserModal />
            </Fade>
          </LayoutContent>
          <Fade mounted={showLoader} speed="fastest">
            <SpinnerCircle />
          </Fade>
          <Fade mounted={messageModalMounted} speed="fastest">
            <ModalMessage message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida augue sed ipsum pulvinar, vel pretium tellus commodo. Aliquam erat volutpat. Morbi placerat justo massa, eget laoreet enim cursus et. Aliquam id scelerisque ipsum, ac rutrum erat. Donec sed blandit metus. Maecenas pellentesque, neque vel " />
          </Fade>
          <Fade mounted={loginModalMounted} speed="fastest">
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
  userModalMounted: selectuiUserModalMounted,
  messageModalMounted: selectuiMessageModalMounted,
  anyModalMounted: selectUiAnyModalMounted,
  loginModalMounted: selectUiLoginModalMounted,
  isLogged: selectSessionLoggedIn,
});

export default connect(mapStateToProps, {
  pushNewRoute,
})(Layout);
