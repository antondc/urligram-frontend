import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksVoteLoading } from 'Modules/Bookmarks/selectors/selectBookmarksVoteLoading';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectCurrentRouteParamLanguage } from 'Modules/Routes/selectors/selectCurrentRouteParamLanguage';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { switchBookmarkCreateModal } from 'Modules/Ui/actions/switchBookmarkCreateModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { userModalMount } from 'Modules/Ui/actions/userModalMount';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { Header as HeaderUi } from './Header';

import './Header.less';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const currentRoute = useSelector(selectCurrentRoute);
  const currentRouteParamLanguage = useSelector(selectCurrentRouteParamLanguage);
  const currentRouteQueryParamFilter = useSelector(selectCurrentRouteQueryParamFilter);
  const currentGlossary = useSelector(selectCurrentGlossary);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const bookmarksVoteLoading = useSelector(selectBookmarksVoteLoading);
  const usersLoading = useSelector(selectUsersLoading);
  const listsLoading = useSelector(selectListsLoading);
  const sessionLoading = useSelector(selectSessionLoading);
  const [searchValue, setSearchValue] = useState<string>(undefined);
  const logoLoadingHeartBeat = bookmarksLoading || bookmarksVoteLoading || usersLoading || listsLoading;
  const logoLoadingColors = sessionLoading;
  const routeName = currentRoute?.name;
  const isHomePage = Routes.Home.name === routeName;

  const switchUiBookmarkModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!session?.id) {
      dispatch(switchLoginModal(true));

      return;
    }
    dispatch(switchBookmarkCreateModal(true));
  };

  const onSearchInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;

    setSearchValue(value);
  };

  const onSearchSubmit = (e: React.FormEvent<HTMLElement> | React.MouseEvent<SVGElement>) => {
    e.preventDefault();

    const urlToRedirect = new URLWrapper(`${currentRoute?.domain}/${currentRouteParamLanguage}`);
    // Only add tags if we are already on home page; otherwise ignore them
    const tags = isHomePage ? currentRouteQueryParamFilter?.tags : undefined;
    const sort = isHomePage ? currentRoute?.queryParams?.sort : undefined;
    urlToRedirect.upsertSearchParams({
      filter: {
        tags,
        text: searchValue,
        sort,
      },
    });

    const updatedUrlToRedirect = urlToRedirect.getPathAndSearch();

    history.push(updatedUrlToRedirect);
  };

  const onSearchCrossClick = () => {
    const urlToRedirect = new URLWrapper(`${currentRoute?.domain}/${currentRouteParamLanguage}`);
    const tags = isHomePage ? currentRouteQueryParamFilter?.tags : undefined;
    urlToRedirect.upsertSearchParams({
      filter: {
        tags,
        text: undefined,
      },
    });

    const updatedUrlToRedirect = urlToRedirect.getPathAndSearch();
    setSearchValue(undefined);
    history.push(updatedUrlToRedirect);
  };

  const onUserClick = () => {
    if (session?.id) {
      dispatch(userModalMount());

      return;
    }
    dispatch(switchLoginModal(true));
  };

  useEffect(() => {
    if (isHomePage) return;

    // If we are not at Home page, clean local state
    setSearchValue(undefined);
  }, [currentRoute?.name]);

  useEffect(() => {
    // If the url contains query param `filter[text]=SOME_TEXT`, update the local state with it
    if (!currentRouteQueryParamFilter?.text) return;

    const stringifiedParam = currentRouteQueryParamFilter?.text?.toString();
    setSearchValue(stringifiedParam);
  }, [currentRoute?.name]);

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
      onSearchCrossClick={onSearchCrossClick}
      onSearchSubmit={onSearchSubmit}
    />
  );
};

export default Header;
