import { RootState } from 'Modules/rootType';
import { UserState } from '../users.types';

export const selectUserById = (state: RootState, { id }: { id: string }): UserState => state.Users?.byKey[id];
