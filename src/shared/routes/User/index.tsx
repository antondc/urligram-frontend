import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { ListState } from 'Modules/Lists/lists.types';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { selectPopularListsLoading } from '../../redux/modules/Sections/selectors/selectPopularListsLoading';
import { User as UserUi } from './User';

interface Props {
  popularLists: ListState[];
  userId: string;
}

const User: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const popularLists = useSelector(selectPopularLists);
  const userId = useSelector(selectCurrentRouteParamUserId);
  const loading = useSelector(selectUsersLoading);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const popularListLoading = useSelector(selectPopularListsLoading);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(loadPopularLists());
    dispatch(loadBookmarksByUserId(userId));
  }, [userId]);

  return (
    <UserUi
      bookmarksIds={bookmarksIds}
      popularLists={popularLists}
      loading={loading}
      popularListLoading={popularListLoading}
    />
  );
};

export default User;
