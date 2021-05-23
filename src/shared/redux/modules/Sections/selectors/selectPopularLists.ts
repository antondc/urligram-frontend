import { ListState } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';

export const selectPopularLists = (state: RootState): ListState[] =>
  state.Sections?.PopularLists?.currentIds?.map((item) => state.Lists?.byKey[item]) || [];
