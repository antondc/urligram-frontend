import { UnknownAction } from 'redux';

export const LISTS_NOTIFICATIONS_LOAD_REQUEST = 'LISTS_NOTIFICATIONS_LOAD_REQUEST';
export const LISTS_NOTIFICATIONS_LOAD_SUCCESS = 'LISTS_NOTIFICATIONS_LOAD_SUCCESS';
export const LISTS_NOTIFICATIONS_LOAD_FAILURE = 'LISTS_NOTIFICATIONS_LOAD_FAILURE';
export const LISTS_NOTIFICATIONS_VIEWED_REQUEST = 'LISTS_NOTIFICATIONS_VIEWED_REQUEST';
export const LISTS_NOTIFICATIONS_VIEWED_SUCCESS = 'LISTS_NOTIFICATIONS_VIEWED_SUCCESS';
export const LISTS_NOTIFICATIONS_VIEWED_FAILURE = 'LISTS_NOTIFICATIONS_VIEWED_FAILURE';

export interface ListNotificationState {
  id: number;
  listId: number;
  bookmarkId: number;
  viewPending: boolean;
}

export interface NotificationsState {
  lists: ListNotificationState[];
}

interface ListsNotificationLoadRequestAction extends UnknownAction {
  type: typeof LISTS_NOTIFICATIONS_LOAD_REQUEST;
  payload: Partial<NotificationsState>;
}

interface ListsNotificationLoadSuccessAction extends UnknownAction {
  type: typeof LISTS_NOTIFICATIONS_LOAD_SUCCESS;
  payload: Partial<NotificationsState>;
}
interface ListsNotificationLoadFailureAction extends UnknownAction {
  type: typeof LISTS_NOTIFICATIONS_LOAD_FAILURE;
  payload: Partial<NotificationsState>;
}

interface ListsNotificationViewedRequestAction extends UnknownAction {
  type: typeof LISTS_NOTIFICATIONS_VIEWED_REQUEST;
  payload: Partial<NotificationsState>;
}

interface ListsNotificationViewedSuccessAction extends UnknownAction {
  type: typeof LISTS_NOTIFICATIONS_VIEWED_SUCCESS;
  payload: Partial<NotificationsState>;
}
interface ListsNotificationViewedFailureAction extends UnknownAction {
  type: typeof LISTS_NOTIFICATIONS_VIEWED_FAILURE;
  payload: Partial<NotificationsState>;
}

export type NotificationsActions =
  | ListsNotificationLoadRequestAction
  | ListsNotificationLoadSuccessAction
  | ListsNotificationLoadFailureAction
  | ListsNotificationViewedRequestAction
  | ListsNotificationViewedSuccessAction
  | ListsNotificationViewedFailureAction;
