import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsLoadByUserId } from 'Modules/Tags/actions/tagsLoadByUserId';
import { selectTagsLoading } from 'Modules/Tags/selectors/selectAllTagsLoading';
import { selectTagsCurrent } from 'Modules/Tags/selectors/selectTagsCurrent';
import { selectTagsMetaSort } from 'Modules/Tags/selectors/selectTagsMetaSort';
import { UserTags as TagsUi } from './UserTags';

const UserTags: React.FC = () => {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const userId = useSelector(selectCurrentRouteParamUserId);
  const tags = useSelector(selectTagsCurrent);
  const tagsLoading = useSelector(selectTagsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectTagsMetaSort);

  useEffect(() => {
    dispatch(tagsLoadByUserId(userId));
  }, [url, session?.id]);

  useEffect(() => {
    dispatch(sectionsMostFollowedUsersLoad());
    dispatch(sectionsNewUsersLoad());
  }, [session?.id]);

  return (
    <TagsUi
      tags={tags}
      tagsLoading={tagsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
      url={url}
      sort={sort}
    />
  );
};

export default UserTags;
