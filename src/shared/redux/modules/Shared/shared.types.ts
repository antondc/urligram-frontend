import { BookmarkState } from '../Bookmarks/bookmarks.types';

export const SHARED_RESET = 'SHARED_RESET';
export const SHARED_LOAD_SUCCESS = 'SHARED_LOAD_SUCCESS';
export const SHARED_LOAD_RECEIVED_REQUEST = 'SHARED_LOAD_RECEIVED_REQUEST';
export const SHARED_LOAD_RECEIVED_SUCCESS = 'SHARED_LOAD_RECEIVED_SUCCESS';
export const SHARED_LOAD_RECEIVED_FAILURE = 'SHARED_LOAD_RECEIVED_FAILURE';
export const SHARED_LOAD_SENT_REQUEST = 'SHARED_LOAD_SENT_REQUEST';
export const SHARED_LOAD_SENT_SUCCESS = 'SHARED_LOAD_SENT_SUCCESS';
export const SHARED_LOAD_SENT_FAILURE = 'SHARED_LOAD_SENT_FAILURE';
export const SHARED_VIEWED_REQUEST = 'SHARED_VIEWED_REQUEST';
export const SHARED_VIEWED_SUCCESS = 'SHARED_VIEWED_SUCCESS';
export const SHARED_VIEWED_FAILURE = 'SHARED_VIEWED_FAILURE';
export const SHARED_SEND_REQUEST = 'SHARED_SEND_REQUEST';
export const SHARED_SEND_SUCCESS = 'SHARED_SEND_SUCCESS';
export const SHARED_SEND_FAILURE = 'SHARED_SEND_FAILURE';

export interface BookmarkError extends Error {
  field: string;
}

export type BookmarksByKey = {
  [key: string]: BookmarkState;
};

export interface SharedItemState {
  bookmarkId: number;
  favicon: string;
  title: string;
  url: string;
  viewed: boolean;
  receiverId: string;
  senderId: string;
}

export interface SharedState {
  bookmarksSent: number[];
  bookmarksReceived: number[];
  loading?: boolean;
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: BookmarkError[];
}

export interface SharedSentGetApiResponse {
  data: {
    type: 'bookmark';
    id: number;
    attributes: {
      userFrom: string;
      bookmarkId: number;
      userTo: string;
    };
  };
}
export interface SharedViewedGetApiResponse {
  data: {
    type: 'bookmark';
    id: number;
    attributes: {
      bookmarkId: number;
      userId: string;
      viewed: boolean;
    };
  };
}

export interface SharedBookmarkGetItemResponse {
  type: 'bookmark';
  id: number;
  attributes: SharedItemState;
}

export interface SharedBookmarksGetApiResponse {
  data: SharedBookmarkGetItemResponse[];
  meta: {
    totalItems: number;
    sort: string;
  };
}

export interface SharedResetAction {
  type: typeof SHARED_RESET;
  payload: SharedState;
}

export interface SharedLoadSuccessAction {
  type: typeof SHARED_LOAD_SUCCESS;
  payload: SharedState;
}

export interface SharedLoadReceivedRequestAction {
  type: typeof SHARED_LOAD_RECEIVED_REQUEST;
  payload: SharedState;
}

export interface SharedLoadReceivedSuccessAction {
  type: typeof SHARED_LOAD_RECEIVED_SUCCESS;
  payload: SharedState;
}

export interface SharedLoadReceivedFailureAction {
  type: typeof SHARED_LOAD_RECEIVED_FAILURE;
  payload: SharedState;
}

export interface SharedLoadSentRequestAction {
  type: typeof SHARED_LOAD_SENT_REQUEST;
  payload: SharedState;
}

export interface SharedLoadSentSuccessAction {
  type: typeof SHARED_LOAD_SENT_SUCCESS;
  payload: SharedState;
}

export interface SharedLoadSentFailureAction {
  type: typeof SHARED_LOAD_SENT_FAILURE;
  payload: SharedState;
}

export interface SharedViewedRequestAction {
  type: typeof SHARED_VIEWED_REQUEST;
  payload: SharedState;
}

export interface SharedViewedSuccessAction {
  type: typeof SHARED_VIEWED_SUCCESS;
  payload: SharedState;
}

export interface SharedViewedFailureAction {
  type: typeof SHARED_VIEWED_FAILURE;
  payload: SharedState;
}

export interface SharedSendRequestAction {
  type: typeof SHARED_SEND_REQUEST;
  payload: SharedState;
}

export interface SharedSendSuccessAction {
  type: typeof SHARED_SEND_SUCCESS;
  payload: SharedState;
}

export interface SharedSendFailureAction {
  type: typeof SHARED_SEND_FAILURE;
  payload: SharedState;
}

export type SharedActions =
  | SharedResetAction
  | SharedLoadSuccessAction
  | SharedLoadReceivedRequestAction
  | SharedLoadReceivedSuccessAction
  | SharedLoadReceivedFailureAction
  | SharedLoadSentRequestAction
  | SharedLoadSentSuccessAction
  | SharedLoadSentFailureAction
  | SharedViewedRequestAction
  | SharedViewedSuccessAction
  | SharedViewedFailureAction
  | SharedSendRequestAction
  | SharedSendSuccessAction
  | SharedSendFailureAction;
