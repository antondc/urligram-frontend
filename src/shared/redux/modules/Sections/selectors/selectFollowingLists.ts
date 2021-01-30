import { ListState } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';

export const selectFollowingLists = (state: RootState): ListState[] =>
  state.Sections?.FollowingLists?.currentIds?.map((item) => state.Lists?.byKey[item]) || [];
