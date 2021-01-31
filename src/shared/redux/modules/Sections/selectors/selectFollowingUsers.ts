import { RootState } from 'Modules/rootType';
import { UserState } from '../../Users/users.types';

export const selectFollowingUsers = (state: RootState): UserState[] =>
  state.Sections?.FollowingUsers?.currentIds?.map((item) => state.Users?.byKey[item]) || [];
