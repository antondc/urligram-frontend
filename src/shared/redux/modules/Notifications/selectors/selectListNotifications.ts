import { RootState } from 'Modules/rootType';
import { ListNotificationState } from '../notifications.types';

export const selectListNotifications = (state: RootState): ListNotificationState[] => state.Notifications?.lists;
