import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { tagsLoad } from 'Modules/Tags/actions/tagsLoad';
import { selectTagsLoading } from 'Modules/Tags/selectors/selectAllTagsLoading';
import { selectTagsCurrent } from 'Modules/Tags/selectors/selectTagsCurrent';
import { selectTagsMetaSort } from 'Modules/Tags/selectors/selectTagsMetaSort';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { isDomAvailable } from '@antoniodcorrea/utils';
import { Tags as TagsUi } from './Tags';

const Tags: React.FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTagsCurrent);
  const tagsLoading = useSelector(selectTagsLoading) && isDomAvailable;
  const glossary = useSelector(selectCurrentGlossary);
  const currentHref = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectTagsMetaSort);

  useEffect(() => {
    dispatch(tagsLoad());
  }, [currentHref]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <TagsUi tags={tags} tagsLoading={tagsLoading} currentHref={currentHref} sort={sort} glossary={glossary} />;
};

export default Tags;
