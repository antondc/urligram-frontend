import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { tagsLoad } from 'Modules/Tags/actions/tagsLoad';
import { selectTagsLoading } from 'Modules/Tags/selectors/selectAllTagsLoading';
import { selectTagsCurrent } from 'Modules/Tags/selectors/selectTagsCurrent';
import { selectTagsMetaSort } from 'Modules/Tags/selectors/selectTagsMetaSort';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { isDomAvailable } from 'Tools/utils/dom/isDomAvailable';
import { Tags as TagsUi } from './Tags';

const Tags: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTagsCurrent);
  const tagsLoading = useSelector(selectTagsLoading) && isDomAvailable;

  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectTagsMetaSort);

  useEffect(() => {
    dispatch(tagsLoad());
  }, [url]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <TagsUi tags={tags} tagsLoading={tagsLoading} url={url} sort={sort} />;
};

export default Tags;
