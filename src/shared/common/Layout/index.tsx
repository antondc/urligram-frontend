import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Location } from 'history';

import Background from 'Assets/svg/background.svg';
import LayoutContent from 'Common/LayoutContent';
import LayoutHelper from 'Common/LayoutHelper';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import LoginModal from 'Components/LoginModal';
import ModalMessage from 'Components/ModalMessage';
import SidebarLeft from 'Components/SidebarLeft';
import SubHeader from 'Components/SubHeader';
import UserModal from 'Components/UserModal';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { RouteState } from 'Modules/Routes/routes.types';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectUiLoginModalMounted } from 'Modules/Ui/selectors/selectUiLoginModalMounted';
import { selectUiMessageModalMounted } from 'Modules/Ui/selectors/selectUiMessageModalMounted';
import { selectUiScreenLocked } from 'Modules/Ui/selectors/selectUiScreenLocked';
import { selectUiUserModalMounted } from 'Modules/Ui/selectors/selectUiUserModalMounted';
import { routesList, routesWithoutOmmitedValues } from 'Routes/index';
import Router from 'Routes/Router';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';
import { Fade, Flex, Hr, SpinnerCircle } from '@antoniodcorrea/components';

import './Layout.less';

interface Props {
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
  addBodyClasses() {
    document.body.classList.remove('preload'); // Preventing animations on load
    document.body.classList.add('isLoaded'); // Showing page on load
  }

  componentDidMount() {
    window.addEventListener('load', this.addBodyClasses);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.addBodyClasses);
  }

  componentDidUpdate = (prevProps) => {
    const { uiScreenLocked, location } = this.props;

    if (location !== prevProps.location) {
      const activeRouteKey = findActiveRouteKey({
        urlPath: location.pathname,
        routes: routesList,
      });

      const enhancedRoute: RouteState = {
        ...enhanceRouteWithParams({
          route: routesWithoutOmmitedValues[activeRouteKey],
          location,
        }),
        domain: `${window.location.protocol}://${window.location.hostname}`,
        href: window.location.href,
        pathAndQuery: `${window.location.pathname}${window.location.search}`,
      };
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
    const { languageLoading, userModalMounted, messageModalMounted, loginModalMounted } = this.props;

    const mounted = !languageLoading;
    const showLoader = false;

    return (
      mounted && (
        <div className="Layout">
          <div className="Layout-background" />
          <LayoutContent>
            <div className="Layout-top">
              <Header />
              <Hr spacer />
              <SubHeader />
              <Hr spacer />
              <Flex vertical="top">
                <SidebarLeft />
                <Route path="/:lang([a-z]{2})?" component={Router} />
              </Flex>
              <Hr spacer />
            </div>
            <LayoutHelper />
            <Footer />
            <Fade mounted={userModalMounted} position="absolute" appear>
              <UserModal />
            </Fade>
          </LayoutContent>
          <Fade mounted={showLoader} speed="fastest" position="fixed" appear>
            <SpinnerCircle />
          </Fade>
          <Fade mounted={messageModalMounted} speed="fastest" position="fixed" appear>
            <ModalMessage message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida augue sed ipsum pulvinar, vel pretium tellus commodo. Aliquam erat volutpat. Morbi placerat justo massa, eget laoreet enim cursus et. Aliquam id scelerisque ipsum, ac rutrum erat. Donec sed blandit metus. Maecenas pellentesque, neque vel " />
          </Fade>
          <Fade mounted={loginModalMounted} speed="fastest" position="fixed" appear>
            <LoginModal />
          </Fade>
          <div id="Tooltips" />
        </div>
      )
    );
  };
}

const mapStateToProps = createStructuredSelector({
  languageLoading: selectLanguageLoading,
  userModalMounted: selectUiUserModalMounted,
  messageModalMounted: selectUiMessageModalMounted,
  uiScreenLocked: selectUiScreenLocked,
  loginModalMounted: selectUiLoginModalMounted,
  isLogged: selectSessionLoggedIn,
});

export default connect(mapStateToProps, {
  pushNewRoute,
})(Layout);
