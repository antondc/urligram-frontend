import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { RootState } from 'Modules/rootType';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteParamUserId } from 'Modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsLoadByUserId } from 'Modules/Tags/actions/tagsLoadByUserId';
import { selectTagsLoading } from 'Modules/Tags/selectors/selectAllTagsLoading';
import { selectTagsCurrent } from 'Modules/Tags/selectors/selectTagsCurrent';
import { selectTagsMetaSort } from 'Modules/Tags/selectors/selectTagsMetaSort';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { isDomAvailable } from '@antoniodcorrea/utils';
import { UserTags as TagsUi } from './UserTags';

const UserTags: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const session = useSelector(selectSession);
  const userId = useSelector(selectCurrentRouteParamUserId);
  const user = useSelector((state: RootState) => selectUserById(state, { id: userId }));

  const tags = useSelector(selectTagsCurrent);
  const tagsLoading = useSelector(selectTagsLoading) && isDomAvailable;

  const currentHref = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectTagsMetaSort);

  useEffect(() => {
    dispatch(userLoad(userId));
  }, []);

  useEffect(() => {
    dispatch(tagsLoadByUserId(userId));
  }, [currentHref, session?.id]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <TagsUi
      glossary={glossary}
      user={user}
      tags={tags}
      tagsLoading={tagsLoading}
      currentHref={currentHref}
      sort={sort}
    />
  );
};

export default UserTags;
