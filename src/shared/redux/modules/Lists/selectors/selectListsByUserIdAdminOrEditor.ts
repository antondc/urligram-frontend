import { RootState } from 'Modules/rootType';
import { ListState, ListUserRole, ListUserStatus } from '../lists.types';

export const selectListsByUserIdAdminOrEditor = (state: RootState, { userId }: { userId: string }): ListState[] =>
  state.Users?.byKey[userId]?.lists
    .filter(
      (item) =>
        (item?.userRole === ListUserRole.Admin || item?.userRole === ListUserRole.Editor) &&
        item?.userListStatus !== ListUserStatus.Pending
    )
    ?.map((item) => state?.Lists?.byKey[item.id]);
