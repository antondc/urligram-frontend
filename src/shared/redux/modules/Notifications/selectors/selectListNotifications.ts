import { createSelector } from 'reselect';

import { ListNotificationState, NotificationsState } from '../notifications.types';
import { selectNotifications } from './selectNotifications';

export const selectListNotifications = createSelector(
  selectNotifications,
  (Notifications: NotificationsState): ListNotificationState[] => Notifications?.lists
);
