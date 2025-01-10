import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectListsByUserIdAll } from 'Modules/Lists/selectors/selectListsByUserIdAll';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { uiSidebarLeftClose } from 'Modules/Ui/actions/uiSidebarLeftClose';
import { uiSidebarLeftOpen } from 'Modules/Ui/actions/uiSidebarLeftOpen';
import { uiSidebarListsClose } from 'Modules/Ui/actions/uiSidebarListsClose';
import { uiSidebarListsOpen } from 'Modules/Ui/actions/uiSidebarListsOpen';
import { selectUiSidebarleftState } from 'Modules/Ui/selectors/selectUiSidebarleftState';
import { selectUiSidebarListsOpen } from 'Modules/Ui/selectors/selectUiSidebarListsOpen';
import { selectUserFollowers } from 'Modules/Users/selectors/selectUserFollowers';
import { selectUserFollowing } from 'Modules/Users/selectors/selectUserFollowing';
import { Routes } from 'Router/routes';
import { LocalStorageWrapper } from 'Services/LocalStorageWrapper';
import { useHandleDrop } from './hooks/useHandleDrop';
import { SidebarLeft as SidebarLeftUi } from './SidebarLeft';

type LocalStorageListsShown = {
  mounted: boolean;
  expires: number;
};
type LocalStorageSidebarOpen = {
  closed: boolean;
  expires: number;
};

const SidebarLeft: React.FC = () => {
  const dispatch = useDispatch();
  const localStorageWrapper = new LocalStorageWrapper();
  const isLoggedIn = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const glossary = useSelector(selectCurrentGlossary);
  const route = useSelector(selectCurrentRoute);
  const lists = useSelector((state: RootState) => selectListsByUserIdAll(state, { userId: sessionId }));
  const listsLoading = useSelector(selectListsLoading);
  const followers = useSelector(selectUserFollowers);
  const following = useSelector(selectUserFollowing);
  const [followersShown, setFollowersShown] = useState<boolean>(false);
  const [followingShown, setFollowingShown] = useState<boolean>(false);
  const timeMsInFourHours = Date.now() + 4 * 60 * 60 * 1000;
  const sidebarLeftClosed = useSelector(selectUiSidebarleftState);
  const isUserPage = route?.params?.userId === sessionId;
  const listsShown = useSelector(selectUiSidebarListsOpen);

  useHandleDrop();

  const listsClose = () => {
    dispatch(uiSidebarListsClose());
    localStorageWrapper.setValue('listsShown', { mounted: false }, timeMsInFourHours);
  };

  const listsOpen = () => {
    dispatch(uiSidebarListsOpen());

    localStorageWrapper.setValue('listsShown', { mounted: true }, timeMsInFourHours);
  };

  const onFollowersTriangleClick = () => {
    setFollowersShown(!followersShown);
    setFollowingShown(false);
    listsClose();
  };

  const onFollowingTriangleClick = () => {
    setFollowingShown(!followingShown);
    setFollowersShown(false);
    listsClose();
  };

  const onListsTriangleClick = () => {
    setFollowingShown(false);
    setFollowersShown(false);

    if (listsShown) {
      listsClose();
    } else {
      listsOpen();
    }
  };

  const onSidebarCloseClick = () => {
    if (sidebarLeftClosed) {
      dispatch(uiSidebarLeftOpen());
      localStorageWrapper.setValue('sidebarLeftState', { closed: false }, timeMsInFourHours);
    } else {
      dispatch(uiSidebarLeftClose());
      dispatch(uiSidebarListsClose());
      setFollowersShown(false);
      setFollowingShown(false);
      localStorageWrapper.setValue('listsShown', { mounted: false }, timeMsInFourHours);
      localStorageWrapper.setValue('sidebarLeftState', { closed: true }, timeMsInFourHours);
    }
  };

  const itemClick = () => {};

  // If we are not in one of these pages, close the lists
  useEffect(() => {
    if (
      route.name === Routes.Home.name ||
      route.name === Routes.UserBookmarks.name ||
      route.name === Routes.List.name
    ) {
      return;
    }
    dispatch(uiSidebarListsClose());
  }, [route.name]);

  useEffect(() => {
    if (!sessionId) return;
    dispatch(listsLoadByUserId({ userId: sessionId, rawData: true }));
  }, [sessionId]);

  useEffect(() => {
    const sidebarLeftListsShown = localStorageWrapper.getValue<LocalStorageListsShown>('listsShown');
    const sidebarLeftState = localStorageWrapper.getValue<LocalStorageSidebarOpen>('sidebarLeftState');

    if (sidebarLeftListsShown && !sidebarLeftState?.closed) {
      listsOpen();
    }
  }, []);

  useEffect(() => {
    const sidebarLeftState = localStorageWrapper.getValue<LocalStorageSidebarOpen>('sidebarLeftState');

    if (sidebarLeftState?.closed) {
      dispatch(uiSidebarLeftClose());
      listsClose();
    } else {
      dispatch(uiSidebarLeftOpen());
    }
  }, []);

  return (
    <SidebarLeftUi
      isUserPage={isUserPage}
      routeName={route?.name}
      isLoggedIn={isLoggedIn}
      sessionId={sessionId}
      glossary={glossary}
      lists={lists}
      listsLoading={listsLoading}
      listsShown={listsShown}
      followers={followers}
      followersShown={followersShown}
      onFollowersTriangleClick={onFollowersTriangleClick}
      following={following}
      followingShown={followingShown}
      onFollowingTriangleClick={onFollowingTriangleClick}
      sidebarLeftClosed={sidebarLeftClosed}
      onListsTriangleClick={onListsTriangleClick}
      onSidebarCloseClick={onSidebarCloseClick}
      itemClick={itemClick}
    />
  );
};

export default SidebarLeft;
