import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { ListState } from 'Modules/Lists/lists.types';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectCurrentRouteParamUserId } from '../../redux/modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectUserBookmarkIds } from '../../redux/modules/Users/selectors/selectUserBookmarkIds';
import { selectUsersLoading } from '../../redux/modules/Users/selectors/selectUsersLoading';
import { User as UserUi } from './User';

interface Props {
  popularLists: ListState[];
  userId: string;
}

const User: React.FC<Props> = ({ popularLists }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const loading = useSelector(selectUsersLoading);
  const bookmarksIds = useSelector((state) => selectUserBookmarkIds(state, { userId }));

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(loadBookmarksByUserId(userId));
  }, [userId]);

  return <UserUi bookmarksIds={bookmarksIds} popularLists={popularLists} loading={loading} />;
};

export default User;
