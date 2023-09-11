import { createSelector } from 'reselect';

import { RootState } from 'Modules/rootType';
import { NotificationsState } from '../notifications.types';

export const selectNotifications = createSelector(
  (state: RootState) => state,
  (state): NotificationsState => state.Notifications
);
