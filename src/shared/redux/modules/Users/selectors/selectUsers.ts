import { RootState } from '../../rootType';
import { UsersState } from '../users.types';

export const selectUsers = (state: RootState): UsersState => state.Users;
