import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Location } from 'history';

import LayoutContent from 'Common/LayoutContent';
import LayoutHelper from 'Common/LayoutHelper';
import BookmarkCreateModal from 'Components/BookmarkCreateModal';
import BookmarkUpdateModal from 'Components/BookmarkUpdateModal';
import Footer from 'Components/Footer';
import ForgotPasswordModal from 'Components/ForgotPasswordModal';
import Header from 'Components/Header';
import ListModal from 'Components/ListModal';
import LoginModal from 'Components/LoginModal';
import ModalMessage from 'Components/ModalMessage';
import Notifications from 'Components/Notifications';
import ResetPasswordModal from 'Components/ResetPasswordModal';
import SignUpModal from 'Components/SignUpModal';
import UserModal from 'Components/UserModal';
import WelcomeModal from 'Components/WelcomeModal';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { RouteState } from 'Modules/Routes/routes.types';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { uiResetState } from 'Modules/Ui/actions/uiResetState';
import { selectUiBookmarkCreateModalMounted } from 'Modules/Ui/selectors/selectUiBookmarkCreateModalMounted';
import { selectUiBookmarkUpdateModalMounted } from 'Modules/Ui/selectors/selectUiBookmarkUpdateModalMounted';
import { selectUiForgotPasswordModalMounted } from 'Modules/Ui/selectors/selectUiForgotPasswordModalMounted';
import { selectUiListModalMounted } from 'Modules/Ui/selectors/selectUiListModalMounted';
import { selectUiLoginModalMounted } from 'Modules/Ui/selectors/selectUiLoginModalMounted';
import { selectUiMessageModalMounted } from 'Modules/Ui/selectors/selectUiMessageModalMounted';
import { selectUiResetPasswordModalMounted } from 'Modules/Ui/selectors/selectUiResetPasswordModalMounted';
import { selectUiScreenLocked } from 'Modules/Ui/selectors/selectUiScreenLocked';
import { selectUiSignUpModalMounted } from 'Modules/Ui/selectors/selectUiSignUpModalMounted';
import { selectUiUserModalMounted } from 'Modules/Ui/selectors/selectUiUserModalMounted';
import { selectUiWelcomeModalMounted } from 'Modules/Ui/selectors/selectUiWelcomeModalMounted';
import Router from 'Router/index';
import { routesList, routesWithoutOmmitedValues } from 'Router/routes';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';
import { Fade } from 'Vendor/components';

import './Layout.less';

const KEY_CODE = 'Escape';

interface Props {
  location: Location;
  languageLoading: boolean;
  userModalMounted: boolean;
  messageModalMounted: boolean;
  loginModalMounted: boolean;
  welcomeModalMounted: boolean;
  signUpModalMounted: boolean;
  forgotPasswordModalMounted: boolean;
  resetPasswordModalMounted: boolean;
  bookmarkCreateModalMounted: boolean;
  bookmarkUpdateModalMounted: boolean;
  listModalMounted: boolean;
  uiScreenLocked: boolean;
  isLogged: boolean;
  pathWithoutLanguageParam: string;
  pushNewRoute: (route) => void;
  uiResetState: () => void;
}

class Layout extends React.Component<Props> {
  addBodyClasses() {
    document.body.classList.remove('preload'); // Preventing animations on load
    document.body.classList.add('isLoaded'); // Showing page on load
  }

  componentDidMount() {
    window.addEventListener('load', this.addBodyClasses);
    document.addEventListener('keydown', this.testKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.addBodyClasses);
    document.removeEventListener('keydown', this.testKeyDown);
  }

  testKeyDown = (e: KeyboardEvent): void => {
    const { uiResetState } = this.props;

    if (e.key === KEY_CODE) uiResetState();
  };

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
    const {
      languageLoading,
      userModalMounted,
      messageModalMounted,
      loginModalMounted,
      welcomeModalMounted,
      signUpModalMounted,
      forgotPasswordModalMounted,
      resetPasswordModalMounted,
      bookmarkCreateModalMounted,
      bookmarkUpdateModalMounted,
      listModalMounted,
    } = this.props;

    const mounted = !languageLoading;

    return (
      mounted && (
        <div className="Layout">
          <div className="Layout-background" />
          <LayoutContent>
            <LayoutHelper />
            <Header />
            <Router />
            <Footer />
            <Fade mounted={userModalMounted} position="absolute" appear>
              <UserModal />
            </Fade>
          </LayoutContent>
          <Fade mounted={messageModalMounted} speed="fastest" position="fixed" appear>
            <ModalMessage message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida augue sed ipsum pulvinar, vel pretium tellus commodo. Aliquam erat volutpat. Morbi placerat justo massa, eget laoreet enim cursus et. Aliquam id scelerisque ipsum, ac rutrum erat. Donec sed blandit metus. Maecenas pellentesque, neque vel " />
          </Fade>
          <Fade mounted={loginModalMounted} speed="fastest" position="fixed" appear>
            <LoginModal />
          </Fade>
          <Fade mounted={signUpModalMounted} speed="fastest" position="fixed" appear>
            <SignUpModal />
          </Fade>
          <Fade mounted={welcomeModalMounted} speed="fastest" position="fixed" appear>
            <WelcomeModal />
          </Fade>
          <Fade mounted={forgotPasswordModalMounted} speed="fastest" position="fixed" appear>
            <ForgotPasswordModal />
          </Fade>
          <Fade mounted={resetPasswordModalMounted} speed="fastest" position="fixed" appear>
            <ResetPasswordModal />
          </Fade>
          <Fade mounted={bookmarkCreateModalMounted} speed="fastest" position="fixed" appear>
            <BookmarkCreateModal />
          </Fade>
          <Fade mounted={bookmarkUpdateModalMounted} speed="fastest" position="fixed" appear>
            <BookmarkUpdateModal />
          </Fade>
          <Fade mounted={listModalMounted} speed="fastest" position="fixed" appear>
            <ListModal />
          </Fade>
          <Notifications />
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
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
  welcomeModalMounted: selectUiWelcomeModalMounted,
  signUpModalMounted: selectUiSignUpModalMounted,
  forgotPasswordModalMounted: selectUiForgotPasswordModalMounted,
  resetPasswordModalMounted: selectUiResetPasswordModalMounted,
  bookmarkCreateModalMounted: selectUiBookmarkCreateModalMounted,
  bookmarkUpdateModalMounted: selectUiBookmarkUpdateModalMounted,
  listModalMounted: selectUiListModalMounted,
});

export default connect(mapStateToProps, {
  pushNewRoute,
  uiResetState,
})(Layout);
