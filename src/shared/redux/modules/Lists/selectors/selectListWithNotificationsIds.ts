import { createSelector } from 'reselect';

import { ListNotificationState } from 'Modules/Notifications/notifications.types';
import { selectListNotifications } from 'Modules/Notifications/selectors/selectListNotifications';

export const selectListWithNotificationsIds = createSelector(
  selectListNotifications,
  (listNotifications: ListNotificationState[]): number[] =>
    listNotifications.filter((item) => item.viewPending === true).map((item) => item.listId)
);
