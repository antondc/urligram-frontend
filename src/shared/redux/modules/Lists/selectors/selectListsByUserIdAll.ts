import { RootState } from 'Modules/rootType';
import { ListState } from '../lists.types';

export const selectListsByUserIdAll = (state: RootState, { userId }: { userId: string }): ListState[] =>
  state.Users?.byKey[userId]?.lists?.map((item) => state?.Lists?.byKey[item.id]);
