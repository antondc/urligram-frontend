import { createSelector } from 'reselect';

import { TagsState, TagState } from '../tags.types';
import { selectTags } from './selectTags';

export const selectTagsCurrent = createSelector(
  selectTags,
  (Tags: TagsState): TagState[] => Tags?.currentIds?.map((tagId) => Tags?.byKey[tagId])
);
