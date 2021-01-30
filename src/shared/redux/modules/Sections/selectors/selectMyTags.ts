import { RootState } from 'Modules/rootType';
import { TagState } from 'Modules/Tags/tags.types';

export const selectMyTags = (state: RootState): TagState[] =>
  state.Sections?.MyTags?.currentIds?.map((item) => state.Tags?.byKey[item]) || [];
