import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { sectionsFollowingListsLoad } from 'Modules/Sections/actions/sectionsFollowingListsLoad';
import { sectionsMyListsLoad } from 'Modules/Sections/actions/sectionsMyListsLoad';
import { sectionsUserMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsUserMostFollowedTagsLoad';
import { selectFollowingLists } from 'Modules/Sections/selectors/selectFollowingLists';
import { selectFollowingListsLoading } from 'Modules/Sections/selectors/selectFollowingListsLoading';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectMyLists } from 'Modules/Sections/selectors/selectMyLists';
import { selectMyListsLoading } from 'Modules/Sections/selectors/selectMyListsLoading';
import { selectUserMostUsedTags } from 'Modules/Sections/selectors/selectUserMostUsedTags';
import { selectUserMostUsedTagsLoading } from 'Modules/Sections/selectors/selectUserMostUsedTagsLoading';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { tagsAllLoad } from 'Modules/Tags/actions/tagsAllLoad';
import { selectTagsLoading } from 'Modules/Tags/selectors/selectAllTagsLoading';
import { selectTagsCurrent } from 'Modules/Tags/selectors/selectTagsCurrent';
import { userFollowersLoad } from 'Modules/Users/actions/userFollowersLoad';
import { TagsUser as TagsUserUi } from './TagsUser';

const TagsUser: React.FC = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const tags = useSelector(selectTagsCurrent);
  const tagsLoading = useSelector(selectTagsLoading);

  const myLists = useSelector(selectMyLists);
  const myListsLoading = useSelector(selectMyListsLoading);
  const followingLists = useSelector(selectFollowingLists);
  const followingListsLoading = useSelector(selectFollowingListsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const userMostUsedTags = useSelector(selectUserMostUsedTags);
  const userMostUsedTagsLoading = useSelector(selectUserMostUsedTagsLoading);

  useEffect(() => {
    dispatch(tagsAllLoad());
    dispatch(listsLoadByUserId(sessionId));
    dispatch(sectionsMyListsLoad(sessionId));
    dispatch(sectionsFollowingListsLoad(sessionId));
    dispatch(sectionsUserMostUsedTagsLoad(sessionId));
    dispatch(userFollowersLoad(sessionId));
  }, []);

  return (
    <TagsUserUi
      sessionId={sessionId}
      tags={tags}
      tagsLoading={tagsLoading}
      myLists={myLists}
      myListsLoading={myListsLoading}
      followingLists={followingLists}
      followingListsLoading={followingListsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
      userMostUsedTags={userMostUsedTags}
      userMostUsedTagsLoading={userMostUsedTagsLoading}
    />
  );
};

export default TagsUser;
