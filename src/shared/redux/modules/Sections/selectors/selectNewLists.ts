import { ListState } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';

export const selectNewLists = (state: RootState): ListState[] =>
  state.Sections?.NewLists?.currentIds?.map((item) => state.Lists?.byKey[item]) || [];
