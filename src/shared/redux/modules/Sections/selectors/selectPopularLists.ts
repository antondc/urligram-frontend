import { ListState } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';

export const selectPopularLists = (state: RootState): ListState[] =>
  Object.values(state.Sections?.PopularLists?.byKey || {});
