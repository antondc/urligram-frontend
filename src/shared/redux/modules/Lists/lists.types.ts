import { BookmarkGetItemResponse, BookmarkState } from '../Bookmarks/bookmarks.types';
import { UserState } from '../Users/users.types';

export const LISTS_LOAD_REQUEST = 'LISTS_LOAD_REQUEST';
export const LISTS_LOAD_SUCCESS = 'LISTS_LOAD_SUCCESS';
export const LIST_CREATE_REQUEST = 'LIST_CREATE_REQUEST';
export const LIST_CREATE_SUCCESS = 'LIST_CREATE_SUCCESS';
export const LIST_CREATE_FAILURE = 'LIST_CREATE_FAILURE';
export const LIST_UPDATE_REQUEST = 'LIST_UPDATE_REQUEST';
export const LIST_UPDATE_SUCCESS = 'LIST_UPDATE_SUCCESS';
export const LIST_UPDATE_FAILURE = 'LIST_UPDATE_FAILURE';
export const LIST_CREATE_RESET = 'LIST_CREATE_RESET';
export const LIST_UNFOLLOW_REQUEST = 'LIST_UNFOLLOW_REQUEST';
export const LIST_UNFOLLOW_SUCCESS = 'LIST_UNFOLLOW_SUCCESS';
export const LIST_UNFOLLOW_FAILURE = 'LIST_UNFOLLOW_FAILURE';
export const LIST_BOOKMARK_CREATE_REQUEST = 'LIST_BOOKMARK_CREATE_REQUEST';
export const LIST_BOOKMARK_CREATE_SUCCESS = 'LIST_BOOKMARK_CREATE_SUCCESS';
export const LIST_BOOKMARK_CREATE_FAILURE = 'LIST_BOOKMARK_CREATE_FAILURE';
export const LIST_BOOKMARK_DELETE_REQUEST = 'LIST_BOOKMARK_DELETE_REQUEST';
export const LIST_BOOKMARK_DELETE_SUCCESS = 'LIST_BOOKMARK_DELETE_SUCCESS';
export const LIST_BOOKMARK_DELETE_FAILURE = 'LIST_BOOKMARK_DELETE_FAILURE';
export const LIST_DELETE_REQUEST = 'LIST_DELETE_REQUEST';
export const LIST_DELETE_SUCCESS = 'LIST_DELETE_SUCCESS';
export const LIST_DELETE_FAILURE = 'LIST_DELETE_FAILURE';
export const LIST_USER_UPSERT_REQUEST = 'LIST_USER_UPSERT_REQUEST';
export const LIST_USER_UPSERT_SUCCESS = 'LIST_USER_UPSERT_SUCCESS';
export const LIST_USER_UPSERT_FAILURE = 'LIST_USER_UPSERT_FAILURE';
export const LIST_USER_DELETE_REQUEST = 'LIST_USER_DELETE_REQUEST';
export const LIST_USER_DELETE_SUCCESS = 'LIST_USER_DELETE_SUCCESS';
export const LIST_USER_DELETE_FAILURE = 'LIST_USER_DELETE_FAILURE';

export interface ListsError extends Error {
  field: string;
}

export interface ListUser extends UserState {
  userRole?: 'reader' | 'editor' | 'admin';
  userStatus?: 'pending' | 'active';
}

export interface ListState {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  userId: string;
  image: string;
  bookmarksIds: number[];
  loading?: boolean;
  members: {
    id: string;
    userRole: 'reader' | 'editor' | 'admin';
    userListStatus: 'active' | 'pending';
  }[];
  tags: {
    id: number;
    name: string;
  }[];
  createdAt: number;
  updatedAt: number;
}

export interface ListsState {
  byKey: {
    [key: string]: ListState;
  };
  loading?: boolean;
  currentIds?: number[];
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: ListsError[];
}

export interface ListApiResponseItem {
  type: 'list';
  id: number;
  attributes: ListState;
}

export interface ListLoadApiResponse {
  data: ListApiResponseItem;
}

export interface ListsLoadApiResponse {
  data: ListApiResponseItem[];
  meta?: {
    totalItems?: number;
    sort?: string;
  };
}

export interface ListCreateApiRequest {
  listName: string;
  listDescription: string;
  listIsPrivate: boolean;
}

export interface ListCreateApiResponse {
  data: ListApiResponseItem;
}

export interface ListBookmarkCreateApiRequest {
  listId: number;
  bookmarkId: number;
}

export interface ListBookmarkCreateApiResponse {
  data: BookmarkGetItemResponse;
}

export interface ListDeleteApiRequest {
  listId: number;
}

export interface ListDeleteApiResponse {
  data: {
    attributes: ListState;
  };
}

export interface ListUpdateApiRequest {
  listId: number;
  listName: string;
  listDescription: string;
  listIsPrivate: boolean;
}

export interface ListUpdateApiResponse {
  data: ListApiResponseItem;
}

interface ListsLoadRequestAction {
  type: typeof LISTS_LOAD_REQUEST;
  payload: Partial<ListsState>;
}

interface ListsLoadSuccessAction {
  type: typeof LISTS_LOAD_SUCCESS;
  payload: Partial<ListsState>;
}

interface ListCreateRequestAction {
  type: typeof LIST_CREATE_REQUEST;
  payload: Partial<ListsState>;
}

interface ListCreateSuccessAction {
  type: typeof LIST_CREATE_SUCCESS;
  payload: Partial<ListsState>;
}

interface ListCreateFailureAction {
  type: typeof LIST_CREATE_FAILURE;
  payload: Partial<ListsState>;
}

interface ListCreateResetAction {
  type: typeof LIST_CREATE_RESET;
  payload: Partial<ListsState>;
}

interface ListUpdateRequestAction {
  type: typeof LIST_UPDATE_REQUEST;
  payload: Partial<ListsState>;
}

interface ListUpdateSuccessAction {
  type: typeof LIST_UPDATE_SUCCESS;
  payload: Partial<ListsState>;
}

interface ListUpdateFailureAction {
  type: typeof LIST_UPDATE_FAILURE;
  payload: Partial<ListsState>;
}

interface ListUnfollowRequestAction {
  type: typeof LIST_UNFOLLOW_REQUEST;
  payload: Partial<ListsState>;
}

interface ListUnfollowSuccessAction {
  type: typeof LIST_UNFOLLOW_SUCCESS;
  payload: Partial<ListsState>;
}

interface ListUnfollowFailureAction {
  type: typeof LIST_UNFOLLOW_FAILURE;
  payload: Partial<ListsState>;
}

interface ListBookmarkCreateRequestAction {
  type: typeof LIST_BOOKMARK_CREATE_REQUEST;
  payload: Partial<BookmarkState>;
}

interface ListBookmarkCreateSuccessAction {
  type: typeof LIST_BOOKMARK_CREATE_SUCCESS;
  payload: Partial<BookmarkState>;
}

interface ListBookmarkCreateFailureAction {
  type: typeof LIST_BOOKMARK_CREATE_FAILURE;
  payload: Partial<BookmarkState>;
}

interface ListBookmarkDeleteRequestAction {
  type: typeof LIST_BOOKMARK_DELETE_REQUEST;
  payload: Partial<BookmarkState>;
}

interface ListBookmarkDeleteSuccessAction {
  type: typeof LIST_BOOKMARK_DELETE_SUCCESS;
  payload: Partial<BookmarkState>;
}

interface ListBookmarkDeleteFailureAction {
  type: typeof LIST_BOOKMARK_DELETE_FAILURE;
  payload: Partial<BookmarkState>;
}

interface ListDeleteRequestAction {
  type: typeof LIST_DELETE_REQUEST;
  payload: Partial<BookmarkState>;
}

interface ListDeleteSuccessAction {
  type: typeof LIST_DELETE_SUCCESS;
  payload: Partial<BookmarkState>;
}

interface ListDeleteFailureAction {
  type: typeof LIST_DELETE_FAILURE;
  payload: Partial<BookmarkState>;
}

interface ListUserUpsertRequestAction {
  type: typeof LIST_USER_UPSERT_REQUEST;
  payload: Partial<BookmarkState>;
}

interface ListUserUpsertSuccessAction {
  type: typeof LIST_USER_UPSERT_SUCCESS;
  payload: Partial<BookmarkState>;
}

interface ListUserUpsertFailureAction {
  type: typeof LIST_USER_UPSERT_FAILURE;
  payload: Partial<BookmarkState>;
}

interface ListUserDeleteRequestAction {
  type: typeof LIST_USER_DELETE_REQUEST;
  payload: Partial<BookmarkState>;
}

interface ListUserDeleteSuccessAction {
  type: typeof LIST_USER_DELETE_SUCCESS;
  payload: Partial<BookmarkState>;
}

interface ListUserDeleteFailureAction {
  type: typeof LIST_USER_DELETE_FAILURE;
  payload: Partial<BookmarkState>;
}

export type ListsActions =
  | ListsLoadRequestAction
  | ListsLoadSuccessAction
  | ListCreateRequestAction
  | ListCreateSuccessAction
  | ListCreateFailureAction
  | ListUpdateRequestAction
  | ListUpdateSuccessAction
  | ListUpdateFailureAction
  | ListCreateResetAction
  | ListUnfollowRequestAction
  | ListUnfollowSuccessAction
  | ListUnfollowFailureAction
  | ListBookmarkCreateRequestAction
  | ListBookmarkCreateSuccessAction
  | ListBookmarkCreateFailureAction
  | ListBookmarkDeleteRequestAction
  | ListBookmarkDeleteSuccessAction
  | ListBookmarkDeleteFailureAction
  | ListDeleteRequestAction
  | ListDeleteSuccessAction
  | ListDeleteFailureAction
  | ListUserUpsertRequestAction
  | ListUserUpsertSuccessAction
  | ListUserUpsertFailureAction
  | ListUserDeleteRequestAction
  | ListUserDeleteSuccessAction
  | ListUserDeleteFailureAction;
