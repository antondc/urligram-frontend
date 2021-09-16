import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksVoteLoading } from 'Modules/Bookmarks/selectors/selectBookmarksVoteLoading';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectLinksLoading } from 'Modules/Links/selectors/selectLinksLoading';
import { selectLinksVoteLoading } from 'Modules/Links/selectors/selectLinksVoteLoading';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { userModalMount } from 'Modules/Ui/actions/userModalMount';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { DELAY_MEDIUM_MS } from 'Root/src/shared/constants';
import HttpClient from 'Services/HttpClient';
import { Header as HeaderUi } from './Header';

import './Header.less';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const currentGlossary = useSelector(selectCurrentGlossary);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const linksLoading = useSelector(selectLinksLoading);
  const linksVoteLoading = useSelector(selectLinksVoteLoading);
  const bookmarksVoteLoading = useSelector(selectBookmarksVoteLoading);
  const usersLoading = useSelector(selectUsersLoading);
  const listsLoading = useSelector(selectListsLoading);
  const sessionLoading = useSelector(selectSessionLoading);
  const [searchValue, setSearchValue] = useState<string>('');
  const logoLoadingHeartBeat =
    bookmarksLoading || linksLoading || linksVoteLoading || bookmarksVoteLoading || usersLoading || listsLoading;
  const logoLoadingColors = sessionLoading;

  const switchUiBookmarkModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!session?.id) {
      dispatch(switchLoginModal(true));

      return;
    }
    dispatch(switchBookmarkCreateModal(true));
  };

  const searchAndNavigate = useCallback(
    debounce(async (text: string) => {
      console.log('=======');
      console.log('searchAndNavigate:');
      console.log(JSON.stringify(text, null, 4));
      console.log('=======');

      await HttpClient.get(`bookmarks?filter[text]=${text}`);
    }, DELAY_MEDIUM_MS),
    []
  );

  const onSearchInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;

    console.log('=======');
    console.log('value:');
    console.log(JSON.stringify(value, null, 4));
    console.log('=======');

    setSearchValue(value);
    searchAndNavigate(value);
  };

  const onUserClick = () => {
    if (session?.id) {
      dispatch(userModalMount());

      return;
    }
    dispatch(switchLoginModal(true));
  };

  return (
    <HeaderUi
      session={session}
      currentGlossary={currentGlossary}
      onUserClick={onUserClick}
      logoLoadingHeartBeat={logoLoadingHeartBeat}
      logoLoadingColors={logoLoadingColors}
      sessionLoading={sessionLoading}
      switchUiBookmarkModal={switchUiBookmarkModal}
      searchValue={searchValue}
      onSearchInputChange={onSearchInputChange}
    />
  );
};

export default Header;
