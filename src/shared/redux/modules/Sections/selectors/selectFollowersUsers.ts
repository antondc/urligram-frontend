import { RootState } from 'Modules/rootType';
import { UserState } from '../../Users/users.types';

export const selectFollowersUsers = (state: RootState): UserState[] =>
  state.Sections?.FollowersUsers?.currentIds?.map((item) => state.Users?.byKey[item]) || [];
