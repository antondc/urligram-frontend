import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksVoteLoading } from 'Modules/Bookmarks/selectors/selectBookmarksVoteLoading';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectLinksLoading } from 'Modules/Links/selectors/selectLinksLoading';
import { selectLinksVoteLoading } from 'Modules/Links/selectors/selectLinksVoteLoading';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { userModalMount } from 'Modules/Ui/actions/userModalMount';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { Header as HeaderUi } from './Header';

import './Header.less';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const route = useSelector(selectCurrentRoute);
  const session = useSelector(selectSession);
  const currentGlossary = useSelector(selectCurrentGlossary);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const linksLoading = useSelector(selectLinksLoading);
  const linksVoteLoading = useSelector(selectLinksVoteLoading);
  const bookmarksVoteLoading = useSelector(selectBookmarksVoteLoading);
  const usersLoading = useSelector(selectUsersLoading);
  const listsLoading = useSelector(selectListsLoading);
  const sessionLoading = useSelector(selectSessionLoading);

  const logoLoadingHeartBeat =
    bookmarksLoading || linksLoading || linksVoteLoading || bookmarksVoteLoading || usersLoading || listsLoading;
  const logoLoadingColors = sessionLoading;

  const onUserClick = () => {
    if (session?.id) {
      dispatch(userModalMount());

      return;
    }
    dispatch(switchLoginModal(true));
  };

  return (
    <HeaderUi
      routeName={route?.name}
      session={session}
      currentGlossary={currentGlossary}
      onUserClick={onUserClick}
      logoLoadingHeartBeat={logoLoadingHeartBeat}
      logoLoadingColors={logoLoadingColors}
      sessionLoading={sessionLoading}
    />
  );
};

export default Header;
