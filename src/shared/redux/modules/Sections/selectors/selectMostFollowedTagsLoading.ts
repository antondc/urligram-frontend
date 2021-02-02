import { RootState } from 'Modules/rootType';

export const selectMostFollowedTagsLoading = (state: RootState): boolean => !!state.Sections?.MostFollowedTags?.loading;
