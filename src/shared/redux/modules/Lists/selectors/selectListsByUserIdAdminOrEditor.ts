import { RootState } from 'Modules/rootType';
import { ListState } from '../lists.types';

export const selectListsByUserIdAdminOrEditor = (state: RootState, { userId }: { userId: string }): ListState[] =>
  state.Users?.byKey[userId]?.lists
    .filter((item) => (item?.userRole === 'admin' || item?.userRole === 'editor') && item?.userListStatus !== 'pending')
    ?.map((item) => state?.Lists?.byKey[item.id]);
