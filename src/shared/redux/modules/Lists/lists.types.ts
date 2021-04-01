import { UserState } from '../Users/users.types';

export const LISTS_LOAD_REQUEST = 'LISTS_LOAD_REQUEST';
export const LISTS_LOAD_SUCCESS = 'LISTS_LOAD_SUCCESS';
export const LIST_LOAD_REQUEST = 'LIST_LOAD_REQUEST';
export const LIST_LOAD_SUCCESS = 'LIST_LOAD_SUCCESS';
export const LIST_CREATE_REQUEST = 'LIST_CREATE_REQUEST';
export const LIST_CREATE_SUCCESS = 'LIST_CREATE_SUCCESS';
export const LIST_CREATE_FAILURE = 'LIST_CREATE_FAILURE';
export const LIST_UPDATE_REQUEST = 'LIST_UPDATE_REQUEST';
export const LIST_UPDATE_SUCCESS = 'LIST_UPDATE_SUCCESS';
export const LIST_UPDATE_FAILURE = 'LIST_UPDATE_FAILURE';
export const LIST_CREATE_RESET = 'LIST_CREATE_RESET';
export const LIST_FOLLOW_REQUEST = 'LIST_FOLLOW_REQUEST';
export const LIST_FOLLOW_SUCCESS = 'LIST_FOLLOW_SUCCESS';
export const LIST_FOLLOW_FAILURE = 'LIST_FOLLOW_FAILURE';
export const LIST_UNFOLLOW_REQUEST = 'LIST_UNFOLLOW_REQUEST';
export const LIST_UNFOLLOW_SUCCESS = 'LIST_UNFOLLOW_SUCCESS';
export const LIST_UNFOLLOW_FAILURE = 'LIST_UNFOLLOW_FAILURE';

export interface ListsError extends Error {
  field: string;
}

export interface ListUser extends UserState {
  userRole: string;
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
    userRole: 'editor' | 'reader';
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

export interface ListApiUserResponseItem {
  type: 'list';
  id: number;
  attributes: ListUser;
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

export interface ListUpdateApiRequest {
  listId: number;
  listName: string;
  listDescription: string;
  listIsPrivate: boolean;
}

export interface ListFollowApiRequest {
  userId: string;
  listId: number;
}

export interface ListFollowApiResponse {
  data: ListApiUserResponseItem;
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

interface ListLoadRequestAction {
  type: typeof LIST_LOAD_REQUEST;
  payload: Partial<ListsState>;
}

interface ListLoadSuccessAction {
  type: typeof LIST_LOAD_SUCCESS;
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

interface ListFollowRequestAction {
  type: typeof LIST_FOLLOW_REQUEST;
  payload: Partial<ListsState>;
}
interface ListFollowSuccessAction {
  type: typeof LIST_FOLLOW_SUCCESS;
  payload: Partial<ListsState>;
}
interface ListFollowFailureAction {
  type: typeof LIST_FOLLOW_FAILURE;
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

export type ListsActions =
  | ListsLoadRequestAction
  | ListsLoadSuccessAction
  | ListLoadRequestAction
  | ListLoadSuccessAction
  | ListCreateRequestAction
  | ListCreateSuccessAction
  | ListCreateFailureAction
  | ListUpdateRequestAction
  | ListUpdateSuccessAction
  | ListUpdateFailureAction
  | ListCreateResetAction
  | ListFollowRequestAction
  | ListFollowSuccessAction
  | ListFollowFailureAction
  | ListUnfollowRequestAction
  | ListUnfollowSuccessAction
  | ListUnfollowFailureAction;
