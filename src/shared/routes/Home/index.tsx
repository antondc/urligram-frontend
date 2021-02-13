import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoadBySize } from 'Modules/Bookmarks/actions/bookmarksLoadBySize';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { tagsAllLoad } from 'Modules/Tags/actions/tagsAllLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsLoading } from 'Modules/Tags/selectors/selectAllTagsLoading';
import { Home as HomeUI } from './Home';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);
  const allTags = useSelector(selectTagsAll).slice(0, 50);
  const allTagsLoading = useSelector(selectTagsLoading);
  const bookmarksCurrentIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);

  useEffect(() => {
    dispatch(sectionsMostFollowedUsersLoad());
    dispatch(sectionsNewUsersLoad());
    dispatch(tagsAllLoad());
    dispatch(bookmarksLoadBySize(5));
  }, []);

  return (
    <HomeUI
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
      allTagsLoading={allTagsLoading}
      allTags={allTags}
      bookmarksCurrentIds={bookmarksCurrentIds}
      bookmarksLoading={bookmarksLoading}
    />
  );
};

export default Home;
