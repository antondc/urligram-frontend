import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksVoteLoading } from 'Modules/Bookmarks/selectors/selectBookmarksVoteLoading';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { userModalMount } from 'Modules/Ui/actions/userModalMount';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { HeaderSmall as HeaderSmallUi } from './HeaderSmall';

import './HeaderSmall.less';

const HeaderSmall: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const currentGlossary = useSelector(selectCurrentGlossary);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const bookmarksVoteLoading = useSelector(selectBookmarksVoteLoading);
  const usersLoading = useSelector(selectUsersLoading);
  const listsLoading = useSelector(selectListsLoading);
  const sessionLoading = useSelector(selectSessionLoading);
  const logoLoadingHeartBeat = bookmarksLoading || bookmarksVoteLoading || usersLoading || listsLoading;
  const logoLoadingColors = sessionLoading;

  const onUserClick = () => {
    if (session?.id) {
      dispatch(userModalMount());

      return;
    }
    dispatch(switchLoginModal(true));
  };

  return (
    <HeaderSmallUi
      session={session}
      currentGlossary={currentGlossary}
      onUserClick={onUserClick}
      logoLoadingHeartBeat={logoLoadingHeartBeat}
      logoLoadingColors={logoLoadingColors}
      sessionLoading={sessionLoading}
    />
  );
};

export default HeaderSmall;
