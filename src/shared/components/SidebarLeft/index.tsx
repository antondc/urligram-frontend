import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectListsByUserId } from 'Modules/Lists/selectors/selectListsByUserId';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { LocalStorageWrapper } from 'Services/LocalStorageWrapper';
import { SidebarLeft as SidebarLeftUi } from './SidebarLeft';

type LocalStorageListsShown = { mounted: boolean; expires: number };

export const SidebarLeft: React.FC = () => {
  const dispatch = useDispatch();
  const localStorageWrapper = new LocalStorageWrapper();

  const isLoggedIn = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const glossary = useSelector(selectCurrentGlossary);
  const route = useSelector(selectCurrentRoute);
  const lists = useSelector((state: RootState) => selectListsByUserId(state, { userId: sessionId }));
  const listsLoading = useSelector(selectListsLoading);
  const [listsShown, setListsShown] = useState<boolean>(true);
  const timeMsInFourHours = Date.now() + 4 * 60 * 60 * 1000;

  const switchUiBookmarkModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(switchBookmarkCreateModal(true));
  };

  const switchUiListModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(switchListModal({ mounted: true }));
  };

  const onListTitleClick = () => {
    const nextValue = !listsShown;
    const nextValueLocalStorage = !!nextValue ? true : false;
    setListsShown(nextValue);
    localStorageWrapper.setValue('listsShown', { mounted: nextValueLocalStorage }, timeMsInFourHours);
  };

  useEffect(() => {
    dispatch(listsLoadByUserId(sessionId));
  }, [sessionId]);

  useEffect(() => {
    const { mounted: sidebarLeftListsShown } = localStorageWrapper.getValue<LocalStorageListsShown>('listsShown');

    setListsShown(Boolean(sidebarLeftListsShown));
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
      listsShown={listsShown}
      onListTitleClick={onListTitleClick}
    />
  );
};

export default SidebarLeft;
