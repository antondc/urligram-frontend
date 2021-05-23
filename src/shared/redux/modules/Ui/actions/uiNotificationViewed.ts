import { AppThunk } from '../../../index';
import { NotificationState, UI_NOTIFICATION_VIEWED, UiActions } from '../ui.types';

export const uiNotificationViewed = (notification: NotificationState): AppThunk<void, UiActions> => async (
  dispatch,
  getState
): Promise<void> => {
  const { Ui } = getState();

  const filteredNotifications = Ui.notifications.map(
    (item: NotificationState): NotificationState => (item.id === notification.id ? { ...item, status: 'viewed' } : item)
  );

  dispatch({
    type: UI_NOTIFICATION_VIEWED,
    payload: {
      ...Ui,
      notifications: filteredNotifications,
    },
  });
};
