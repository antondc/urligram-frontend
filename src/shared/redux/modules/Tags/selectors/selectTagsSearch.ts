import { createSelector } from 'reselect';

import { TagState } from '../tags.types';
import { selectTags } from './selectTags';

export const selectTagsSearch = createSelector(
  selectTags,
  (Tags): TagState[] => Tags?.searchIds.map((tagId) => Tags?.byKey[tagId])
);
