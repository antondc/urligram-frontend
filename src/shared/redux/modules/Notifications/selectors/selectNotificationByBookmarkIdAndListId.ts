import { createSelector } from 'reselect';

import { ListNotificationState, NotificationsState } from '../notifications.types';
import { selectNotifications } from './selectNotifications';

const selectListId = (_, { listId }): number => listId;
const selectBookmarkId = (_, { bookmarkId }): number => bookmarkId;

export const selectNotificationByBookmarkIdAndListId = createSelector(
  selectNotifications,
  selectListId,
  selectBookmarkId,
  (Notifications: NotificationsState, listId, bookmarkId): ListNotificationState =>
    Notifications?.lists?.find((item) => item.listId === listId && item.bookmarkId === bookmarkId)
);
