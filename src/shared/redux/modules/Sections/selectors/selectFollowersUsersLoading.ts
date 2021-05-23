import { RootState } from 'Modules/rootType';

export const selectFollowersUsersLoading = (state: RootState): boolean => !!state.Sections?.FollowersUsers?.loading;
