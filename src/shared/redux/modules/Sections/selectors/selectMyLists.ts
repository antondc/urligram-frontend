import { ListState } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';

export const selectMyLists = (state: RootState): ListState[] =>
  state.Sections?.MyLists?.currentIds?.map((item) => state.Lists?.byKey[item]) || [];
