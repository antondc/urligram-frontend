import { RootState } from 'Modules/rootType';
import { UserState } from '../users.types';

export const selectUsersByIds = (State: Partial<RootState>, { userIds }: { userIds: string[] }): UserState[] =>
  userIds?.map((item) => State?.Users?.byKey[item]);
