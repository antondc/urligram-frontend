import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { ListState } from 'Modules/Lists/lists.types';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectFollowingLists } from 'Modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from 'Modules/Sections/selectors/selectFollowingListsLoading';
import { selectFollowingUsers } from 'Modules/Sections/selectors/selectFollowingUsers';
import { selectFollowingUsersLoading } from 'Modules/Sections/selectors/selectFollowingUsersLoading';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { RootState } from '../../redux/modules/rootType';
import { sectionsFollowersUsersLoad } from '../../redux/modules/Sections/actions/sectionsFollowersUsersLoad';
import { sectionsFollowingListsLoad } from '../../redux/modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsFollowingUsersLoad } from '../../redux/modules/Sections/actions/sectionsFollowingUsersLoad';
import { sectionsUserListsLoad } from '../../redux/modules/Sections/actions/sectionsUserListsLoad';
import { selectFollowersUsers } from '../../redux/modules/Sections/selectors/selectFollowersUsers';
import { selectFollowersUsersLoading } from '../../redux/modules/Sections/selectors/selectFollowersUsersLoading';
import { selectUserLists } from '../../redux/modules/Sections/selectors/selectUserLists';
import { selectUserListsLoading } from '../../redux/modules/Sections/selectors/selectUserListsLoading';
import { selectUserById } from '../../redux/modules/Users/selectors/selectUserById';
import { UserUser as UserUserUi } from './UserUser';

interface Props {
  popularLists: ListState[];
  userId: string;
}

const UserUser: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const userLists = useSelector(selectUserLists);
  const userListsLoading = useSelector(selectUserListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const followingUsers = useSelector(selectFollowingUsers);
  const followingUsersLoading = useSelector(selectFollowingUsersLoading);
  const followersUsers = useSelector(selectFollowersUsers);
  const followersUsersLoading = useSelector(selectFollowersUsersLoading);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(loadBookmarksByUserId(userId));
    dispatch(sectionsUserListsLoad(userId));
    dispatch(sectionsFollowingListsLoad(userId));
    dispatch(sectionsFollowingUsersLoad(userId));
    dispatch(sectionsFollowersUsersLoad(userId));
  }, [userId]);

  return (
    <UserUserUi
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

export default UserUser;
