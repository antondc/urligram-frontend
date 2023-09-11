import { createSelector } from 'reselect';

import { TagState } from 'Modules/Tags/tags.types';
import { selectTags } from './selectTags';

export const selectTagsAll = createSelector(selectTags, (Tags): TagState[] => Object.values(Tags.byKey));
