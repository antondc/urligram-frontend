import { ListState } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';

export const selectSimilarLists = (state: RootState): ListState[] =>
  state.Sections?.SimilarLists?.currentIds?.map((item) => state.Lists?.byKey[item]) || [];
