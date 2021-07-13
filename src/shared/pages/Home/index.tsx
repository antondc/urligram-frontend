import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoad } from 'Modules/Bookmarks/actions/bookmarksLoad';
import { bookmarksRecommended } from 'Modules/Bookmarks/actions/bookmarksRecommended';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsMyRecentBookmarksLoad } from 'Modules/Sections/actions/sectionsMyRecentBookmarksLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectMyRecentBookmarks } from 'Modules/Sections/selectors/selectMyRecentBookmarks';
import { selectMyRecentBookmarksLoading } from 'Modules/Sections/selectors/selectMyRecentBookmarksLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsLoad } from 'Modules/Tags/actions/tagsLoad';
import { Home as HomeUI } from './Home';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const bookmarksCurrentIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksCurrentIdsLoading = useSelector(selectBookmarksLoading);
  const myRecentBookmarks = useSelector(selectMyRecentBookmarks);
  const myRecentBookmarksLoading = useSelector(selectMyRecentBookmarksLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const url = useSelector(selectCurrentFullUrl);

  useEffect(() => {
    dispatch(sectionsMostFollowedUsersLoad());
    dispatch(sectionsNewUsersLoad());
    dispatch(tagsLoad());
    dispatch(listsLoadByUserId({ userId: session?.id }));
    dispatch(sectionsMyRecentBookmarksLoad(session?.id));
  }, [session?.id]);

  useEffect(() => {
    if (!!session?.id) {
      dispatch(bookmarksRecommended());

      return;
    }
    dispatch(bookmarksLoad());
  }, [url, session?.id]);

  return (
    <HomeUI
      session={session}
      bookmarksIds={bookmarksCurrentIds}
      bookmarksIdsLoading={bookmarksCurrentIdsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
      myRecentBookmarks={myRecentBookmarks}
      myRecentBookmarksLoading={myRecentBookmarksLoading}
      page={page}
      totalItems={totalItems}
      url={url}
    />
  );
};

export default Home;
