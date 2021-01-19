import { RootState } from 'Modules/rootType';
import { UserState } from 'Modules/Users/users.types';

export const selectUsersAll = (state: RootState): UserState[] => Object.values(state.Users.byKey);
