import { RootState } from 'Modules/rootType';
import { PopularListsState } from '../sections.types';

export const selectPopularLists = (state: RootState): PopularListsState[] =>
  Object.values(state.Sections?.PopularLists?.byKey || {});
