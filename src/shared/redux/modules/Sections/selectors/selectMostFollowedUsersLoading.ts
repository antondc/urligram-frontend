import { RootState } from 'Modules/rootType';

export const selectMostFollowedUsersLoading = (state: RootState): boolean =>
  !!state.Sections?.MostFollowedUsers?.loading;
