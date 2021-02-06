import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { ListState } from 'Modules/Lists/lists.types';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from 'Modules/Sections/selectors/selectPopularListsLoading';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { sectionsUserListsLoad } from '../../redux/modules/Sections/actions/sectionsUserListsLoad';
import { selectUserLists } from '../../redux/modules/Sections/selectors/selectUserLists';
import { selectUserListsLoading } from '../../redux/modules/Sections/selectors/selectUserListsLoading';
import { UserUser as UserUserUi } from './UserUser';

interface Props {
  popularLists: ListState[];
  userId: string;
}

const UserUser: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const popularLists = useSelector(selectPopularLists);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const popularListLoading = useSelector(selectPopularListsLoading);
  const userLists = useSelector(selectUserLists);
  const userListsLoading = useSelector(selectUserListsLoading);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(loadPopularLists());
    dispatch(loadBookmarksByUserId(userId));
    dispatch(sectionsUserListsLoad(userId));
  }, [userId]);

  return (
    <UserUserUi
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      popularLists={popularLists}
      popularListLoading={popularListLoading}
      userLists={userLists}
      userListsLoading={userListsLoading}
    />
  );
};

export default UserUser;
