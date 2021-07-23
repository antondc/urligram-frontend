import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import {
  LISTS_NOTIFICATIONS_LOAD_REQUEST,
  LISTS_NOTIFICATIONS_LOAD_SUCCESS,
  NotificationsActions,
  NotificationsState,
} from '../notifications.types';

export const listNotificationsLoad =
  (): AppThunk<Promise<NotificationsState[]>, NotificationsActions> =>
  async (dispatch, getState): Promise<NotificationsState[]> => {
    const { Notifications: notificationsBeforeRequest } = getState();

    dispatch({
      type: LISTS_NOTIFICATIONS_LOAD_REQUEST,
      payload: {
        ...notificationsBeforeRequest,
      },
    });

    try {
      const { data } = await HttpClient.get<void, any>('/lists/bookmarks/users/me');
      const { Notifications: notificationsAfterResponse } = getState();

      const listNotificationsArray = data?.map((item) => item.attributes);

      dispatch({
        type: LISTS_NOTIFICATIONS_LOAD_SUCCESS,
        payload: {
          ...notificationsAfterResponse,
          lists: listNotificationsArray,
        },
      });

      return listNotificationsArray;
    } catch (error) {
      throw error;
    }
  };
