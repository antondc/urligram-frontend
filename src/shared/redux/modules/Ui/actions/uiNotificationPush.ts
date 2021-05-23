import { v4 } from 'uuid';

import { AppThunk } from '../../../index';
import { NotificationState, UI_NOTIFICATION_PUSH, UiActions } from '../ui.types';

export const uiNotificationPush = (notification: NotificationState): AppThunk<void, UiActions> => async (
  dispatch,
  getState
): Promise<void> => {
  const { Ui } = getState();

  const id = v4();

  dispatch({
    type: UI_NOTIFICATION_PUSH,
    payload: {
      ...Ui,
      notifications: [
        {
          ...notification,
          id,
        },
        ...Ui.notifications,
      ],
    },
  });
};
