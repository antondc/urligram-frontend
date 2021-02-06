import { RootState } from 'Modules/rootType';
import { TagState } from 'Modules/Tags/tags.types';

export const selectTagsInThisList = (state: RootState): TagState[] =>
  state.Sections?.TagsInThisList?.currentIds?.map((item) => state.Tags?.byKey[item]) || [];
