import { RootState } from 'Modules/rootType';
import { ListNotificationState } from '../notifications.types';

export const selectNotificationByBookmarkIdAndListId = (
  state: RootState,
  { listId, bookmarkId }: { listId: number; bookmarkId: number }
): ListNotificationState =>
  state.Notifications?.lists?.find((item) => item.listId === listId && item.bookmarkId === bookmarkId);
