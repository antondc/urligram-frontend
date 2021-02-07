import { RootState } from 'Modules/rootType';
import { TagState } from 'Modules/Tags/tags.types';

export const selectMostUsedTags = (state: RootState): TagState[] =>
  state.Sections?.MostUsedTags?.currentIds?.map((item) => state.Tags?.byKey[item]) || [];
