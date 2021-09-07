import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Location } from 'history';

import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { listNotificationsLoad } from 'Modules/Notifications/actions/listNotificationsLoad';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { RouteState } from 'Modules/Routes/routes.types';
import { selectCurrentPathAndQuery } from 'Modules/Routes/selectors/selectCurrentPathAndQuery';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { uiResetState } from 'Modules/Ui/actions/uiResetState';
import { selectUiForgotPasswordModalMounted } from 'Modules/Ui/selectors/selectUiForgotPasswordModalMounted';
import { selectUiListModalMounted } from 'Modules/Ui/selectors/selectUiListModalMounted';
import { selectUiLoginModalMounted } from 'Modules/Ui/selectors/selectUiLoginModalMounted';
import { selectUiResetPasswordModalMounted } from 'Modules/Ui/selectors/selectUiResetPasswordModalMounted';
import { selectUiScreenLocked } from 'Modules/Ui/selectors/selectUiScreenLocked';
import { selectUiScreenMobileLocked } from 'Modules/Ui/selectors/selectUiScreenMobileLocked';
import { selectUiSignUpModalMounted } from 'Modules/Ui/selectors/selectUiSignUpModalMounted';
import { selectUiWelcomeModalMounted } from 'Modules/Ui/selectors/selectUiWelcomeModalMounted';
import { userFollowingLoad } from 'Modules/Users/actions/userFollowingLoad';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { routesList, routesWithoutOmmitedValues } from 'Router/routes';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';
import { tagsSearchLoad } from '../../redux/modules/Tags/actions/tagsSearchLoad';
import { KEY_CODE } from './constants';
import { Layout as LayoutUi } from './Layout';

import './Layout.less';

interface Props {
  location: Location;
}

const Layout: React.FC<Props> = ({ location }) => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const locationPathAndSearchQuery = `${location.pathname}${location.search}`;
  const currentPathAndQuery = useSelector(selectCurrentPathAndQuery);
  const languageLoading = useSelector(selectLanguageLoading);
  const uiScreenLocked = useSelector(selectUiScreenLocked);
  const uiScreenMobileLocked = useSelector(selectUiScreenMobileLocked);
  const loginModalMounted = useSelector(selectUiLoginModalMounted);
  const welcomeModalMounted = useSelector(selectUiWelcomeModalMounted);
  const signUpModalMounted = useSelector(selectUiSignUpModalMounted);
  const forgotPasswordModalMounted = useSelector(selectUiForgotPasswordModalMounted);
  const resetPasswordModalMounted = useSelector(selectUiResetPasswordModalMounted);
  const listModalMounted = useSelector(selectUiListModalMounted);
  const renderLoader = !!languageLoading; /* || otherVariables */

  // Lock screen
  if (uiScreenLocked) {
    document.body.classList.add('scrollLocked');
  } else {
    document.body.classList.remove('scrollLocked');
  }

  // Lock mobile screen
  if (uiScreenMobileLocked) {
    document.body.classList.add('scrollMobileLocked');
  } else {
    document.body.classList.remove('scrollMobileLocked');
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

  useEffect(() => {
    dispatch(userLoad(session?.id));
    dispatch(userFollowingLoad(session?.id));
    dispatch(listsLoadByUserId({ userId: session?.id, rawData: true }));
  }, [session?.id]);

  useEffect(() => {
    session?.id && dispatch(listNotificationsLoad());
  }, [session?.id]);

  useEffect(() => {
    dispatch(tagsSearchLoad());
  }, [session?.id]);

  return (
    <LayoutUi
      loginModalMounted={loginModalMounted}
      signUpModalMounted={signUpModalMounted}
      welcomeModalMounted={welcomeModalMounted}
      forgotPasswordModalMounted={forgotPasswordModalMounted}
      resetPasswordModalMounted={resetPasswordModalMounted}
      listModalMounted={listModalMounted}
      renderLoader={renderLoader}
    />
  );
};

export default Layout;
