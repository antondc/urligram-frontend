import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Location } from 'history';

import LayoutContent from 'Common/LayoutContent';
import LayoutHelper from 'Common/LayoutHelper';
import BookmarkCreateModal from 'Components/BookmarkCreateModal';
import BookmarkUpdateModal from 'Components/BookmarkUpdateModal';
import CookiesBanner from 'Components/CookiesBanner';
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
import { selectCurrentPathAndQuery } from 'Modules/Routes/selectors/selectCurrentPathAndQuery';
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
import { Fade, SpinnerCircularBrute } from 'Vendor/components';

import './Layout.less';

const KEY_CODE = 'Escape';

interface Props {
  location: Location;
}

const Layout: React.FC<Props> = ({ location }) => {
  const dispatch = useDispatch();
  const locationPathAndSearchQuery = `${location.pathname}${location.search}`;
  const currentPathAndQuery = useSelector(selectCurrentPathAndQuery);
  const languageLoading = useSelector(selectLanguageLoading);
  const userModalMounted = useSelector(selectUiUserModalMounted);
  const messageModalMounted = useSelector(selectUiMessageModalMounted);
  const uiScreenLocked = useSelector(selectUiScreenLocked);
  const loginModalMounted = useSelector(selectUiLoginModalMounted);
  const welcomeModalMounted = useSelector(selectUiWelcomeModalMounted);
  const signUpModalMounted = useSelector(selectUiSignUpModalMounted);
  const forgotPasswordModalMounted = useSelector(selectUiForgotPasswordModalMounted);
  const resetPasswordModalMounted = useSelector(selectUiResetPasswordModalMounted);
  const bookmarkCreateModalMounted = useSelector(selectUiBookmarkCreateModalMounted);
  const bookmarkUpdateModalMounted = useSelector(selectUiBookmarkUpdateModalMounted);
  const listModalMounted = useSelector(selectUiListModalMounted);
  const renderLoader = !!languageLoading; /* || otherVariables */

  // Lock screen on Modal mount
  if (uiScreenLocked) {
    document.body.classList.add('scrollLocked');
  } else {
    document.body.classList.remove('scrollLocked');
  }

  const addBodyClasses = () => {
    document.body.classList.remove('preload'); // Preventing animations on load
    document.body.classList.add('isLoaded'); // Showing page on load
  };

  const testKeyDown = (e: KeyboardEvent): void => {
    if (e.key === KEY_CODE) dispatch(uiResetState());
  };

  useEffect(() => {
    window.addEventListener('load', addBodyClasses);
    document.addEventListener('keydown', testKeyDown);

    return () => {
      window.removeEventListener('load', addBodyClasses);
      document.removeEventListener('keydown', testKeyDown);
    };
  }, []);

  useEffect(() => {
    if (currentPathAndQuery === locationPathAndSearchQuery) return; // For first render: if the route coming from server is the same as the one rendered by client, return

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

    dispatch(pushNewRoute(enhancedRoute));
  }, [locationPathAndSearchQuery]); // Update by props, not by state, as this useEffect aims to update the state

  return (
    <div className="Layout">
      <div className="Layout-background" />
      <LayoutContent>
        <LayoutHelper />
        <Header />
        <CookiesBanner />
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
      <Fade mounted={renderLoader} speed="fastest" position="fixed" appear>
        <div className="Layout-loader">
          <SpinnerCircularBrute className="Layout-loaderIcon" size="huge" />
        </div>
      </Fade>
    </div>
  );
};

export default Layout;
