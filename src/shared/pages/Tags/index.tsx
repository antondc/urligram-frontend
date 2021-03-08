import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sectionsMostFollowedUsersLoad } from 'Modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsNewUsersLoad } from 'Modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostFollowedUsers } from 'Modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from 'Modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectNewUsers } from 'Modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from 'Modules/Sections/selectors/selectNewUsersLoading';
import { tagsAllLoad } from 'Modules/Tags/actions/tagsAllLoad';
import { selectTagsLoading } from 'Modules/Tags/selectors/selectAllTagsLoading';
import { selectTagsCurrent } from 'Modules/Tags/selectors/selectTagsCurrent';
import { Tags as TagsUi } from './Tags';

const Tags: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTagsCurrent);
  const tagsLoading = useSelector(selectTagsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);

  useEffect(() => {
    dispatch(tagsAllLoad());
    dispatch(sectionsMostFollowedUsersLoad());
    dispatch(sectionsNewUsersLoad());
  }, []);

  return (
    <TagsUi
      tags={tags}
      tagsLoading={tagsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
    />
  );
};

export default Tags;
