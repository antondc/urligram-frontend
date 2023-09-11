import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { TagsState } from '../tags.types';

export const selectTags = createSelector(
  (state: RootState) => state,
  (state): TagsState => state.Tags
);
