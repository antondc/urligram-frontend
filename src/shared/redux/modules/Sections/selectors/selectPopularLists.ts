import { PopularListsState } from '../sections.types';

export const selectPopularLists = (state): PopularListsState[] =>
  Object.values(state.Sections?.PopularLists?.byKey || {});
