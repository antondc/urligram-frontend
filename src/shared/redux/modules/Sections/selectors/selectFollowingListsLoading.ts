import { RootState } from 'Modules/rootType';

export const selectFollowingListsLoading = (state: RootState): boolean => !!state.Sections?.FollowingLists?.loading;
