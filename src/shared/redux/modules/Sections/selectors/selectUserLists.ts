import { ListState } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';

export const selectUserLists = (state: RootState): ListState[] =>
  state.Sections?.UserLists?.currentIds?.map((item) => state.Lists?.byKey[item]) || [];
