import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'Modules/rootType';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsMostUsedTagsLoad';
import { sectionsUserMostUsedTagsLoad } from 'Modules/Sections/actions/sectionsUserMostFollowedTagsLoad';
import { selectMostUsedTags } from 'Modules/Sections/selectors/selectMostUsedTags';
import { selectMostUsedTagsLoading } from 'Modules/Sections/selectors/selectMostUsedTagsLoading';
import { selectUserMostUsedTags } from 'Modules/Sections/selectors/selectUserMostUsedTags';
import { selectUserMostUsedTagsLoading } from 'Modules/Sections/selectors/selectUserMostUsedTagsLoading';
import { userFollowersLoad } from 'Modules/Users/actions/userFollowersLoad';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { selectUsersMetaSort } from 'Modules/Users/selectors/selectUsersMetaSort';
import { selectUsersTotalItems } from 'Modules/Users/selectors/selectUsersTotalItems';
import { Followers as FollowersUI } from './Followers';

const Followers: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));
  const usersCurrentIds = useSelector(selectUsersCurrentIds);
  const usersLoading = useSelector(selectUsersLoading);
  const mostUsedTags = useSelector(selectMostUsedTags);
  const mostUsedTagsLoading = useSelector(selectMostUsedTagsLoading);
  const userMostUsedTags = useSelector(selectUserMostUsedTags);
  const userMostUsedTagsLoading = useSelector(selectUserMostUsedTagsLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectUsersTotalItems);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectUsersMetaSort);

  useEffect(() => {
    dispatch(userLoad(userId));
    dispatch(sectionsMostUsedTagsLoad());
    dispatch(sectionsUserMostUsedTagsLoad(userId));
  }, []);

  useEffect(() => {
    dispatch(userFollowersLoad(userId));
  }, [page]);

  return (
    <FollowersUI
      user={user}
      userId={userId}
      usersCurrentIds={usersCurrentIds}
      usersLoading={usersLoading}
      mostUsedTags={mostUsedTags}
      mostUsedTagsLoading={mostUsedTagsLoading}
      userMostUsedTags={userMostUsedTags}
      userMostUsedTagsLoading={userMostUsedTagsLoading}
      page={page}
      totalItems={totalItems}
      url={url}
      sort={sort}
    />
  );
};

export default Followers;
