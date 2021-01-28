import { RootState } from 'Modules/rootType';
import { UserState } from '../../Users/users.types';

export const selectMostFollowedUsers = (state: RootState): UserState[] =>
  state.Sections?.MostFollowedUsers?.currentIds?.map((item) => state.Users?.byKey[item]) || [];
