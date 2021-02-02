import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsFollowingUsersLoad } from 'Modules/Sections/actions/sectionsFollowingUsersLoad';
import { sectionsUserListsLoad } from 'Modules/Sections/actions/sectionsUserListsLoad';
import { selectFollowingLists } from 'Modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from 'Modules/Sections/selectors/selectFollowingListsLoading';
import { selectFollowingUsers } from 'Modules/Sections/selectors/selectFollowingUsers';
import { selectFollowingUsersLoading } from 'Modules/Sections/selectors/selectFollowingUsersLoading';
import { selectUserLists } from 'Modules/Sections/selectors/selectUserLists';
import { selectUserListsLoading } from 'Modules/Sections/selectors/selectUserListsLoading';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { sectionsFollowersUsersLoad } from '../../redux/modules/Sections/actions/sectionsFollowersUsersLoad';
import { selectFollowersUsers } from '../../redux/modules/Sections/selectors/selectFollowersUsers';
import { UserBookmarksVisitor as UserBookmarksVisitorUi } from './UserBookmarksVisitor';

const UserBookmarksVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const userLists = useSelector(selectUserLists);
  const userListsLoading = useSelector(selectUserListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const followingUsers = useSelector(selectFollowingUsers);
  const followingUsersLoading = useSelector(selectFollowingUsersLoading);
  const followersUsers = useSelector(selectFollowersUsers);
  const followersUsersLoading = useSelector(selectFollowingUsersLoading);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(loadBookmarksByUserId(userId));
    dispatch(sectionsUserListsLoad(userId));
    dispatch(sectionsFollowingListsLoad(userId));
    dispatch(sectionsFollowingUsersLoad(userId));
    dispatch(sectionsFollowersUsersLoad(userId));
  }, []);

  return (
    <UserBookmarksVisitorUi
      userId={userId}
      user={user}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      userLists={userLists}
      userListsLoading={userListsLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
      followingUsers={followingUsers}
      followingUsersLoading={followingUsersLoading}
      followersUsers={followersUsers}
      followersUsersLoading={followersUsersLoading}
    />
  );
};

export default UserBookmarksVisitor;
