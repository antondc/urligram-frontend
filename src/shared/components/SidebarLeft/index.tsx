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
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { uiSidebarLeftClose } from 'Modules/Ui/actions/uiSidebarLeftClose';
import { uiSidebarLeftOpen } from 'Modules/Ui/actions/uiSidebarLeftOpen';
import { selectUiSidebarleftState } from 'Modules/Ui/selectors/selectUiSidebarleftState';
import { LocalStorageWrapper } from 'Services/LocalStorageWrapper';
import { SidebarLeft as SidebarLeftUi } from './SidebarLeft';

type LocalStorageListsShown = {
  mounted: boolean;
  expires: number;
};
type LocalStorageSidebarOpen = {
  closed: boolean;
  expires: number;
};

export const SidebarLeft: React.FC = () => {
  const dispatch = useDispatch();
  const localStorageWrapper = new LocalStorageWrapper();

  const isLoggedIn = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const glossary = useSelector(selectCurrentGlossary);
  const route = useSelector(selectCurrentRoute);
  const lists = useSelector((state: RootState) => selectListsByUserIdAll(state, { userId: sessionId }));
  const listsLoading = useSelector(selectListsLoading);
  const [listsShown, setListsShown] = useState<boolean>(true);
  const timeMsInFourHours = Date.now() + 4 * 60 * 60 * 1000;
  const sidebarLeftClosed = useSelector(selectUiSidebarleftState);

  const switchUiBookmarkModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(switchBookmarkCreateModal(true));
  };

  const switchUiListModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(switchListModal({ mounted: true }));
  };

  const onListTitleClick = () => {
    if (sidebarLeftClosed) return;

    const nextValue = !listsShown;
    const nextValueLocalStorage = !!nextValue ? true : false;
    setListsShown(nextValue);
    localStorageWrapper.setValue('listsShown', { mounted: nextValueLocalStorage }, timeMsInFourHours);
  };

  const onSidebarCloseClick = () => {
    if (sidebarLeftClosed) {
      dispatch(uiSidebarLeftOpen());
      localStorageWrapper.setValue('sidebarLeftState', { closed: false }, timeMsInFourHours);
    } else {
      dispatch(uiSidebarLeftClose());
      setListsShown(false);
      localStorageWrapper.setValue('listsShown', { mounted: false }, timeMsInFourHours);
      localStorageWrapper.setValue('sidebarLeftState', { closed: true }, timeMsInFourHours);
    }
  };

  useEffect(() => {
    dispatch(listsLoadByUserId({ userId: sessionId, rawData: true }));
  }, [sessionId]);

  useEffect(() => {
    const sidebarLeftListsShown = localStorageWrapper.getValue<LocalStorageListsShown>('listsShown');
    const sidebarLeftState = localStorageWrapper.getValue<LocalStorageSidebarOpen>('sidebarLeftState');

    const sidebarLeftListsShownAndSidebarOpen = sidebarLeftListsShown?.mounted && !sidebarLeftState?.closed;
    setListsShown(Boolean(sidebarLeftListsShownAndSidebarOpen));
  }, []);

  useEffect(() => {
    const sidebarLeftState = localStorageWrapper.getValue<LocalStorageSidebarOpen>('sidebarLeftState');

    if (sidebarLeftState?.closed) {
      dispatch(uiSidebarLeftClose());
      setListsShown(false);
      localStorageWrapper.setValue('sidebarLeftState', { closed: false }, timeMsInFourHours);
    } else {
      dispatch(uiSidebarLeftOpen());
    }
  }, []);

  return (
    <SidebarLeftUi
      routeName={route?.name}
      isLoggedIn={isLoggedIn}
      sessionId={sessionId}
      glossary={glossary}
      switchUiBookmarkModal={switchUiBookmarkModal}
      switchUiListModal={switchUiListModal}
      lists={lists}
      listsLoading={listsLoading}
      listsShown={listsShown && !sidebarLeftClosed} // If sidebar is closed, don't display lists
      sidebarLeftClosed={sidebarLeftClosed}
      onListTitleClick={onListTitleClick}
      onSidebarCloseClick={onSidebarCloseClick}
    />
  );
};

export default SidebarLeft;
