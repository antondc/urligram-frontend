import {
  LISTS_NOTIFICATIONS_LOAD_FAILURE,
  LISTS_NOTIFICATIONS_LOAD_REQUEST,
  LISTS_NOTIFICATIONS_LOAD_SUCCESS,
  LISTS_NOTIFICATIONS_VIEWED_FAILURE,
  LISTS_NOTIFICATIONS_VIEWED_REQUEST,
  LISTS_NOTIFICATIONS_VIEWED_SUCCESS,
  NotificationsActions,
  NotificationsState,
} from './notifications.types';

export const initialState: NotificationsState = {
  lists: [],
};

export const Notifications = (state = initialState, action: NotificationsActions): NotificationsState => {
  switch (action.type) {
    case LISTS_NOTIFICATIONS_LOAD_FAILURE:
    case LISTS_NOTIFICATIONS_LOAD_REQUEST:
    case LISTS_NOTIFICATIONS_LOAD_SUCCESS:
    case LISTS_NOTIFICATIONS_VIEWED_FAILURE:
    case LISTS_NOTIFICATIONS_VIEWED_REQUEST:
    case LISTS_NOTIFICATIONS_VIEWED_SUCCESS:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
