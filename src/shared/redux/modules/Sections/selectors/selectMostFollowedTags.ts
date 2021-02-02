import { RootState } from 'Modules/rootType';
import { TagState } from 'Modules/Tags/tags.types';

export const selectMostFollowedTags = (state: RootState): TagState[] =>
  state.Sections?.MostFollowedTags?.currentIds?.map((item) => state.Tags?.byKey[item]) || [];
