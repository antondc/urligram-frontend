import { RootState } from 'Modules/rootType';
import { ListNotificationState } from '../notifications.types';

export const selectNotificationsByListId = (
  state: RootState,
  { listId }: { listId: number }
): ListNotificationState[] => state.Notifications?.lists.filter((item) => item.listId === listId);
