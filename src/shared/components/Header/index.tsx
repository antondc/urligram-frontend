import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksVoteLoading } from 'Modules/Bookmarks/selectors/selectBookmarksVoteLoading';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLinksLoading } from 'Modules/Links/selectors/selectLinksLoading';
import { selectLinksVoteLoading } from 'Modules/Links/selectors/selectLinksVoteLoading';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { switchUserModal } from 'Modules/Ui/actions/switchUserModal';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { Header as HeaderUi } from './Header';

import './Header.less';

interface Props {
  isLogged: boolean;
  currentGlossary: GlossaryState;
  currentLanguageSlug: string;
  bookmarksLoading: boolean;
  linksLoading: boolean;
  linksVoteLoading: boolean;
  bookmarksVoteLoading: boolean;
  usersLoading: boolean;
  listsLoading: boolean;
  switchUserModal: () => void;
  switchLoginModal: () => void;
}

const Header: React.FC<Props> = ({
  isLogged,
  currentGlossary,
  switchUserModal,
  currentLanguageSlug,
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

  return (
    <HeaderUi
      isLogged={isLogged}
      currentGlossary={currentGlossary}
      switchUserModal={switchUserModal}
      currentLanguageSlug={currentLanguageSlug}
      switchLoginModal={switchLoginModal}
      loading={loading}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isLogged: selectSessionLoggedIn,
  currentGlossary: selectCurrentGlossary,
  currentLanguageSlug: selectCurrentLanguageSlug,
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
