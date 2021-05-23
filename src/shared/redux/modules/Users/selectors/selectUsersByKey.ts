import { RootState } from 'Modules/rootType';
import { UsersState } from 'Modules/Users/users.types';

export const selectUsersByKey = (state: RootState): UsersState => state.Users;
