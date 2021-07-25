import { createSelector } from 'reselect';

import { selectTags } from 'Modules/Tags/selectors/selectTags';
import { TagsState, TagState } from 'Modules/Tags/tags.types';
import { SectionsState } from '../sections.types';
import { selectSections } from './selectSections';

export const selectTagsInThisList = createSelector(
  selectSections,
  selectTags,
  (Sections: SectionsState, Tags: TagsState): TagState[] =>
    Sections?.TagsInThisList?.currentIds?.map((item) => Tags?.byKey[item]).slice(0, 10) || []
);
