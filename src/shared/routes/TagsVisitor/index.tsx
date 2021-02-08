import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadPopularLists } from '../../redux/modules/Sections/actions/loadPopularLists';
import { sectionsMostFollowedUsersLoad } from '../../redux/modules/Sections/actions/sectionsMostFollowedUsersLoad';
import { sectionsNewListsLoad } from '../../redux/modules/Sections/actions/sectionsNewListsLoad';
import { sectionsNewUsersLoad } from '../../redux/modules/Sections/actions/sectionsNewUsersLoad';
import { selectMostFollowedUsers } from '../../redux/modules/Sections/selectors/selectMostFollowedUsers';
import { selectMostFollowedUsersLoading } from '../../redux/modules/Sections/selectors/selectMostFollowedUsersLoading';
import { selectNewLists } from '../../redux/modules/Sections/selectors/selectNewLists';
import { selectNewListsLoading } from '../../redux/modules/Sections/selectors/selectNewListsLoading';
import { selectNewUsers } from '../../redux/modules/Sections/selectors/selectNewUsers';
import { selectNewUsersLoading } from '../../redux/modules/Sections/selectors/selectNewUsersLoading';
import { selectPopularLists } from '../../redux/modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from '../../redux/modules/Sections/selectors/selectPopularListsLoading';
import { tagsAllLoad } from '../../redux/modules/Tags/actions/tagsAllLoad';
import { selectTagsLoading } from '../../redux/modules/Tags/selectors/selectAllTagsLoading';
import { selectTagsCurrent } from '../../redux/modules/Tags/selectors/selectTagsCurrent';
import { TagsVisitor as TagsVisitorUi } from './TagsVisitor';

const TagsVisitor: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTagsCurrent);
  const tagsLoading = useSelector(selectTagsLoading);
  const popularLists = useSelector(selectPopularLists);
  const popularListsLoading = useSelector(selectPopularListsLoading);
  const newLists = useSelector(selectNewLists);
  const newListsLoading = useSelector(selectNewListsLoading);
  const mostFollowedUsers = useSelector(selectMostFollowedUsers);
  const mostFollowedUsersLoading = useSelector(selectMostFollowedUsersLoading);
  const newUsers = useSelector(selectNewUsers);
  const newUsersLoading = useSelector(selectNewUsersLoading);

  useEffect(() => {
    dispatch(tagsAllLoad());
    dispatch(loadPopularLists());
    dispatch(sectionsNewListsLoad());
    dispatch(sectionsMostFollowedUsersLoad());
    dispatch(sectionsNewUsersLoad());
  }, []);

  return (
    <TagsVisitorUi
      tags={tags}
      tagsLoading={tagsLoading}
      popularLists={popularLists}
      popularListsLoading={popularListsLoading}
      newLists={newLists}
      newListsLoading={newListsLoading}
      mostFollowedUsers={mostFollowedUsers}
      mostFollowedUsersLoading={mostFollowedUsersLoading}
      newUsers={newUsers}
      newUsersLoading={newUsersLoading}
    />
  );
};

export default TagsVisitor;
