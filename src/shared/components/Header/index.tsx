import React from 'react';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksVoteLoading } from 'Modules/Bookmarks/selectors/selectBookmarksVoteLoading';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectLinksLoading } from 'Modules/Links/selectors/selectLinksLoading';
import { selectLinksVoteLoading } from 'Modules/Links/selectors/selectLinksVoteLoading';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUser } from 'Modules/Session/selectors/selectSessionUser';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { switchUserModal } from 'Modules/Ui/actions/switchUserModal';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { Header as HeaderUi } from './Header';

import './Header.less';

interface Props {
  isLogged: boolean;
  currentGlossary: GlossaryState;
  bookmarksLoading: boolean;
  linksLoading: boolean;
  linksVoteLoading: boolean;
  bookmarksVoteLoading: boolean;
  usersLoading: boolean;
  listsLoading: boolean;
  switchUserModal: () => void;
  switchLoginModal: (mount: true) => void;
}

const Header: React.FC<Props> = ({
  isLogged,
  currentGlossary,
  switchUserModal,
  switchLoginModal,
  bookmarksLoading,
  linksLoading,
  linksVoteLoading,
  bookmarksVoteLoading,
  usersLoading,
  listsLoading,
}) => {
  const loading =
    bookmarksLoading || linksLoading || linksVoteLoading || bookmarksVoteLoading || usersLoading || listsLoading;
  const sessionUser = useSelector(selectSessionUser);

  return (
    <HeaderUi
      isLogged={isLogged}
      sessionUser={sessionUser}
      currentGlossary={currentGlossary}
      switchUserModal={switchUserModal}
      switchLoginModal={switchLoginModal}
      loading={loading}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isLogged: selectSessionLoggedIn,
  currentGlossary: selectCurrentGlossary,
  bookmarksLoading: selectBookmarksLoading,
  linksLoading: selectLinksLoading,
  linksVoteLoading: selectLinksVoteLoading,
  bookmarksVoteLoading: selectBookmarksVoteLoading,
  usersLoading: selectUsersLoading,
  listsLoading: selectListsLoading,
});

export default connect(mapStateToProps, {
  switchUserModal,
  switchLoginModal,
})(Header);
