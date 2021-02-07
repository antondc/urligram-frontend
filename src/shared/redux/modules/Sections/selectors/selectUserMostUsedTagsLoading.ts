import { RootState } from 'Modules/rootType';

export const selectUserMostUsedTagsLoading = (state: RootState): boolean => !!state.Sections?.UserMostUsedTags?.loading;
