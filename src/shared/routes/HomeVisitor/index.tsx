import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsNewListsLoad } from 'Modules/Sections/actions/sectionsNewListsLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectNewLists } from 'Modules/Sections/selectors/selectNewLists';
import { selectNewListsLoading } from 'Modules/Sections/selectors/selectNewListsLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from 'Modules/Sections/selectors/selectPopularListsLoading';
import { tagsAllLoad } from 'Modules/Tags/actions/tagsAllLoad';
import { loadBookmarks } from '../../redux/modules/Bookmarks/actions/loadBookmarks';
import { selectBookmarksAll } from '../../redux/modules/Bookmarks/selectors/selectBookmarksAll';
import { selectBookmarksCurrentIds } from '../../redux/modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from '../../redux/modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectTagsAll } from '../../redux/modules/Tags/selectors/selectAllTags';
import { selectTagsLoading } from '../../redux/modules/Tags/selectors/selectAllTagsLoading';
import { HomeVisitor as HomeVisitorUI } from './HomeVisitor';

const HomeVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const mostFollowedLists = useSelector(selectPopularLists);
  const newLists = useSelector(selectNewLists);
  const newListsLoading = useSelector(selectNewListsLoading);
  const mostFollowedListsLoading = useSelector(selectPopularListsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);
  const allTags = useSelector(selectTagsAll).slice(0, 50);
  const allTagsLoading = useSelector(selectTagsLoading);
  const bookmarksCurrentIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);

  useEffect(() => {
    dispatch(loadPopularLists());
    dispatch(sectionsNewListsLoad());
    dispatch(sectionsMostFollowedUsersLoad());
    dispatch(sectionsNewUsersLoad());
    dispatch(tagsAllLoad());
    dispatch(loadBookmarks(5));
  }, []);

  return (
    <HomeVisitorUI
      mostFollowedLists={mostFollowedLists}
      mostFollowedListsLoading={mostFollowedListsLoading}
      newLists={newLists}
      newListsLoading={newListsLoading}
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

export default HomeVisitor;
