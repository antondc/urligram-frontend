import { RootState } from 'Modules/rootType';
import { UserStatus } from '../../Users/users.types';

export const selectSessionStatus = (state: RootState): UserStatus => state.Session.status;
