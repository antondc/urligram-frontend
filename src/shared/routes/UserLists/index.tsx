import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectUserMostUsedTags } from 'Modules/Sections/selectors/selectUserMostUsedTags';
import { selectUserMostUsedTagsLoading } from 'Modules/Sections/selectors/selectUserMostUsedTagsLoading';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { UserLists as UserListsUi } from './UserLists';

const UserLists: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const listsIds = useSelector(selectListsAllIds);
  const listsLoading = useSelector(selectListsLoading);
  const userMostUsedTags = useSelector(selectUserMostUsedTags);
  const userMostUsedTagsLoading = useSelector(selectUserMostUsedTagsLoading);
  const mostFollowedTags = useSelector(selectMostUsedTags);
  const mostFollowedTagsLoading = useSelector(selectMostUsedTagsLoading);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(listsLoadByUserId(userId));
  }, []);

  return (
    <UserListsUi
      userId={userId}
      user={user}
      listsIds={listsIds}
      listsLoading={listsLoading}
      userMostUsedTags={userMostUsedTags}
      userMostUsedTagsLoading={userMostUsedTagsLoading}
      mostFollowedTags={mostFollowedTags}
      mostFollowedTagsLoading={mostFollowedTagsLoading}
    />
  );
};

export default UserLists;
