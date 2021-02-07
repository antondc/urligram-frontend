import { RootState } from 'Modules/rootType';
import { TagState } from 'Modules/Tags/tags.types';

export const selectUserMostUsedTags = (state: RootState): TagState[] =>
  state.Sections?.UserMostUsedTags?.currentIds?.map((item) => state.Tags?.byKey[item]) || [];
