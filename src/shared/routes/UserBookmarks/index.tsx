import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sectionsFollowersUsersLoad } from 'Modules/Sections/actions/sectionsFollowersUsersLoad';
import { sectionsFollowingUsersLoad } from 'Modules/Sections/actions/sectionsFollowingUsersLoad';
import { selectFollowersUsers } from 'Modules/Sections/selectors/selectFollowersUsers';
import { selectFollowingUsers } from 'Modules/Sections/selectors/selectFollowingUsers';
import { selectFollowingUsersLoading } from 'Modules/Sections/selectors/selectFollowingUsersLoading';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { UserBookmarks as UserBookmarksUi } from './UserBookmarks';

const UserBookmarks: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const followingUsers = useSelector(selectFollowingUsers);
  const followingUsersLoading = useSelector(selectFollowingUsersLoading);
  const followersUsers = useSelector(selectFollowersUsers);
  const followersUsersLoading = useSelector(selectFollowingUsersLoading);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(loadBookmarksByUserId(userId));
    dispatch(sectionsFollowingUsersLoad(userId));
    dispatch(sectionsFollowersUsersLoad(userId));
  }, []);

  return (
    <UserBookmarksUi
      userId={userId}
      user={user}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      followingUsers={followingUsers}
      followingUsersLoading={followingUsersLoading}
      followersUsers={followersUsers}
      followersUsersLoading={followersUsersLoading}
    />
  );
};

export default UserBookmarks;
