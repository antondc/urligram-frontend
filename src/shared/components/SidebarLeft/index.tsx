import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { SidebarLeft as SidebarLeftUi } from './SidebarLeft';

export const SidebarLeft: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const glossary = useSelector(selectCurrentGlossary);
  const route = useSelector(selectCurrentRoute);

  const switchUiBookmarkModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(switchBookmarkCreateModal(true));
  };

  const switchUiListModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(switchListModal({ mounted: true }));
  };

  return (
    <SidebarLeftUi
      routeName={route?.name}
      isLoggedIn={isLoggedIn}
      sessionId={sessionId}
      glossary={glossary}
      switchUiBookmarkModal={switchUiBookmarkModal}
      switchUiListModal={switchUiListModal}
    />
  );
};

export default SidebarLeft;
