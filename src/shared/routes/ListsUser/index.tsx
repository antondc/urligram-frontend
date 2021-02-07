import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadLists } from 'Modules/Lists/actions/loadLists';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { sectionsFollowersUsersLoad } from 'Modules/Sections/actions/sectionsFollowersUsersLoad';
import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsMyListsLoad } from 'Modules/Sections/actions/sectionsMyListsLoad';
import { sectionsUserMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsUserMostFollowedTagsLoad';
import { selectFollowersUsers } from 'Modules/Sections/selectors/selectFollowersUsers';
import { selectFollowersUsersLoading } from 'Modules/Sections/selectors/selectFollowersUsersLoading';
import { selectFollowingLists } from 'Modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from 'Modules/Sections/selectors/selectFollowingListsLoading';
import { selectMyLists } from 'Modules/Sections/selectors/selectMyLists';
import { selectMyListsLoading } from 'Modules/Sections/selectors/selectMyListsLoading';
import { selectUserMostUsedTags } from 'Modules/Sections/selectors/selectUserMostUsedTags';
import { selectUserMostUsedTagsLoading } from 'Modules/Sections/selectors/selectUserMostUsedTagsLoading';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { ListsUser as ListsUserUI } from './ListsUser';

const ListsUser: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const listsIds = useSelector(selectListsAllIds);
  const listsIdsLoading = useSelector(selectListsLoading);
  const myLists = useSelector(selectMyLists);
  const myListsLoading = useSelector(selectMyListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const followersUsers = useSelector(selectFollowersUsers);
  const followersUsersLoading = useSelector(selectFollowersUsersLoading);
  const userMostUsedTags = useSelector(selectUserMostUsedTags);
  const userMostUsedTagsLoading = useSelector(selectUserMostUsedTagsLoading);

  useEffect(() => {
    dispatch(loadLists());
    dispatch(userLoad(sessionId));
    dispatch(sectionsMyListsLoad(sessionId));
    dispatch(sectionsFollowingListsLoad(sessionId));
    dispatch(sectionsUserMostUsedTagsLoad(sessionId));
    dispatch(sectionsFollowersUsersLoad(sessionId));
  }, [sessionId]);

  return (
    <ListsUserUI
      sessionId={sessionId}
      listsIds={listsIds}
      listsIdsLoading={listsIdsLoading}
      myLists={myLists}
      myListsLoading={myListsLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
      userMostUsedTags={userMostUsedTags}
      userMostUsedTagsLoading={userMostUsedTagsLoading}
      followersUsers={followersUsers}
      followersUsersLoading={followersUsersLoading}
    />
  );
};

export default ListsUser;
