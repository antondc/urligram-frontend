import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { ListState } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sectionsFollowersUsersLoad } from 'Modules/Sections/actions/sectionsFollowersUsersLoad';
import { sectionsFollowingUsersLoad } from 'Modules/Sections/actions/sectionsFollowingUsersLoad';
import { selectFollowersUsers } from 'Modules/Sections/selectors/selectFollowersUsers';
import { selectFollowersUsersLoading } from 'Modules/Sections/selectors/selectFollowersUsersLoading';
import { selectFollowingUsers } from 'Modules/Sections/selectors/selectFollowingUsers';
import { selectFollowingUsersLoading } from 'Modules/Sections/selectors/selectFollowingUsersLoading';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { User as UserUi } from './User';

interface Props {
  popularLists: ListState[];
  userId: string;
}

const User: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const followingUsers = useSelector(selectFollowingUsers);
  const followingUsersLoading = useSelector(selectFollowingUsersLoading);
  const followersUsers = useSelector(selectFollowersUsers);
  const followersUsersLoading = useSelector(selectFollowersUsersLoading);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const date = new LocaleFormattedDate(user?.createdAt, currentLanguageSlug);
  const createdAt = date.getLocaleFormattedDate();

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(loadBookmarksByUserId(userId, 5));
    dispatch(sectionsFollowingUsersLoad(userId));
    dispatch(sectionsFollowersUsersLoad(userId));
  }, []);

  return (
    <UserUi
      userId={userId}
      user={user}
      createdAt={createdAt}
      bookmarksIds={bookmarksIds}
      bookmarksLoading={bookmarksLoading}
      followingUsers={followingUsers}
      followingUsersLoading={followingUsersLoading}
      followersUsers={followersUsers}
      followersUsersLoading={followersUsersLoading}
    />
  );
};

export default User;
