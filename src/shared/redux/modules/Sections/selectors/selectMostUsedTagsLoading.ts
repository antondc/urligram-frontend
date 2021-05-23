import { RootState } from 'Modules/rootType';

export const selectMostUsedTagsLoading = (state: RootState): boolean => !!state.Sections?.MostUsedTags?.loading;
