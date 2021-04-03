import { RootState } from 'Modules/rootType';
import { ListState } from '../lists.types';

export const selectListsByUserId = (state: RootState, { userId }: { userId: string }): ListState[] =>
  Object.values(state.Lists?.byKey).filter((item) => item.userId === userId);
