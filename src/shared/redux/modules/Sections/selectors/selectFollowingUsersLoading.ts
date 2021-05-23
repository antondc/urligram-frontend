import { RootState } from 'Modules/rootType';

export const selectFollowingUsersLoading = (state: RootState): boolean => !!state.Sections?.FollowingUsers?.loading;
