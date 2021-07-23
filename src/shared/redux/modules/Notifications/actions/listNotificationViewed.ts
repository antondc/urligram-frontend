import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import {
  LISTS_NOTIFICATIONS_VIEWED_REQUEST,
  LISTS_NOTIFICATIONS_VIEWED_SUCCESS,
  NotificationsActions,
  NotificationsState,
} from '../notifications.types';

export const listNotificationViewed =
  ({
    listId,
    bookmarkId,
  }: {
    listId: number;
    bookmarkId: number;
  }): AppThunk<Promise<NotificationsState[]>, NotificationsActions> =>
  async (dispatch, getState): Promise<NotificationsState[]> => {
    const { Notifications: notificationsBeforeRequest } = getState();

    dispatch({
      type: LISTS_NOTIFICATIONS_VIEWED_REQUEST,
      payload: notificationsBeforeRequest,
    });

    try {
      const { data } = await HttpClient.patch<void, any>(`/lists/${listId}/bookmarks/${bookmarkId}/users/me`, {
        viewPending: false,
      });
      const { Notifications: notificationsAfterResponse } = getState();
      const filteredListNotifications = notificationsAfterResponse.lists.filter(
        (item) => item.id !== data.attributes.id
      );

      dispatch({
        type: LISTS_NOTIFICATIONS_VIEWED_SUCCESS,
        payload: {
          ...notificationsAfterResponse,
          lists: [...filteredListNotifications, { ...data.attributes }],
        },
      });

      return data.attributes;
    } catch (error) {
      throw error;
    }
  };
