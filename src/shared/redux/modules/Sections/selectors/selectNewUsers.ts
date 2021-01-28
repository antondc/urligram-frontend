import { RootState } from 'Modules/rootType';
import { UserState } from '../../Users/users.types';

export const selectNewUsers = (state: RootState): UserState[] =>
  state.Sections?.NewUsers?.currentIds?.map((item) => state.Users?.byKey[item]) || [];
