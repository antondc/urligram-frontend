import { RootState } from 'Modules/rootType';
import { UserState } from 'Modules/Users/users.types';

export const selectUsersByKey = (state: RootState): { [key: string]: UserState } => state.Users.byKey;
