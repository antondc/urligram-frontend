import { RootState } from 'Modules/rootType';
import { NotificationsState } from '../notifications.types';

export const selectNotifications = (state: RootState): NotificationsState => state.Notifications;
