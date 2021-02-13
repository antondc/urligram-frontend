import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { RootState } from 'Modules/rootType';
import { sectionsFollowingUsersLoad } from 'Modules/Sections/actions/sectionsFollowingUsersLoad';
import { sectionsMyTagsLoad } from 'Modules/Sections/actions/sectionsMyTagsLoad';
import { selectFollowingUsers } from 'Modules/Sections/selectors/selectFollowingUsers';
import { selectFollowingUsersLoading } from 'Modules/Sections/selectors/selectFollowingUsersLoading';
import { selectMyTags } from 'Modules/Sections/selectors/selectMyTags';
import { selectMyTagsLoading } from 'Modules/Sections/selectors/selectMyTagsLoading';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { HomeUser as HomeUserUi } from './HomeUser';

const HomeUser: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const myTags = useSelector(selectMyTags);
  const myTagsLoading = useSelector(selectMyTagsLoading);
  const followingUsers = useSelector(selectFollowingUsers);
  const followingUsersLoading = useSelector(selectFollowingUsersLoading);
  const user = useSelector((state: RootState) => selectUserById(state, { id: sessionId }));
  const bookmarksLoading = useSelector(selectBookmarksLoading);

  useEffect(() => {
    dispatch(sectionsMyTagsLoad(sessionId));
    dispatch(sectionsFollowingUsersLoad(sessionId));
    dispatch(userLoad(sessionId));
    dispatch(loadBookmarksByUserId(sessionId));
  }, [sessionId]);

  return (
    <HomeUserUi
      user={user}
      bookmarksLoading={bookmarksLoading}
      sessionId={sessionId}
      myTags={myTags}
      myTagsLoading={myTagsLoading}
      followingUsers={followingUsers}
      followingUsersLoading={followingUsersLoading}
    />
  );
};

export default HomeUser;
