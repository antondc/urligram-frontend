import { RootState } from 'Modules/rootType';
import { TagState } from '../tags.types';

export const selectTagsSearch = (state: RootState): TagState[] =>
  state.Tags?.searchIds.map((tagId) => state.Tags?.byKey[tagId]);
