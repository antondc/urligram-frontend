import { SessionState } from 'Modules/Session/session.types';

export const USERS_LOAD_REQUEST = 'USERS_LOAD_REQUEST';
export const USERS_LOAD_SUCCEED = 'USERS_LOAD_SUCCEED';
export const USER_LOAD_REQUEST = 'USER_LOAD_REQUEST';
export const USER_LOAD_SUCCEED = 'USER_LOAD_SUCCEED';
export const USER_FOLLOW_CREATE_REQUEST = 'USER_FOLLOW_CREATE_REQUEST';
export const USER_FOLLOW_CREATE_SUCCEED = 'USER_FOLLOW_CREATE_SUCCEED';
export const USER_FOLLOW_CREATE_FAILURE = 'USER_FOLLOW_CREATE_FAILURE';
export const USER_FOLLOW_DELETE_REQUEST = 'USER_FOLLOW_DELETE_REQUEST';
export const USER_FOLLOW_DELETE_SUCCEED = 'USER_FOLLOW_DELETE_SUCCEED';
export const USER_FOLLOW_DELETE_FAILURE = 'USER_FOLLOW_DELETE_FAILURE';
export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
export const USER_DELETE_SUCCEED = 'USER_DELETE_SUCCEED';
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE';
export const USER_UPDATE_DETAILS = 'USER_UPDATE_DETAILS';
export interface UserState {
  id: string;
  name: string;
  image: {
    original: string;
    w200h200?: string;
    w500h500?: string;
  };
  level: string;
  email: string;
  status: string;
  statement: string;
  location: string;
  order: number;
  createdAt: number;
  updatedAt: number;
  followers?: string[];
  following?: string[];
  lists?: {
    id: number;
    userRole: 'reader' | 'editor' | 'admin';
    userListStatus?: 'pending' | 'active';
  }[];
  bookmarksIds?: number[];
  tags?: {
    id: number;
    name: string;
  }[];
}

export interface UsersState {
  byKey: {
    [key: string]: UserState;
  };
  currentIds?: string[];
  loading?: boolean;
  meta?: {
    totalItems?: number;
    sort?: string;
  };
  errors?: Error[];
}

export interface UsersLoadApiItemResponse {
  type: 'user';
  id: string;
  attributes: UserState;
}

export interface UserLoadApiResponse {
  data: UsersLoadApiItemResponse;
}

export interface UsersLoadApiResponse {
  data: UsersLoadApiItemResponse[];
  meta: {
    totalItems?: number;
    sort?: string;
  };
}

export interface UserFollowCreateApiResponse {
  data: UsersLoadApiItemResponse;
}

export interface UserFollowDeleteApiResponse {
  data: {
    success: boolean;
  };
}

export interface UserDeleteApiResponse {
  data: {
    success: boolean;
  };
}

interface UsersLoadRequestAction {
  type: typeof USERS_LOAD_REQUEST;
  payload: Partial<UsersState>;
}

interface UsersLoadSuccessAction {
  type: typeof USERS_LOAD_SUCCEED;
  payload: Partial<UsersState>;
}

interface UserLoadRequestAction {
  type: typeof USER_LOAD_REQUEST;
  payload: Partial<UsersState>;
}

interface UserLoadSuccessAction {
  type: typeof USER_LOAD_SUCCEED;
  payload: Partial<UsersState>;
}

interface UserFollowCreateRequestAction {
  type: typeof USER_FOLLOW_CREATE_REQUEST;
  payload: Partial<UsersState>;
}

interface UserFollowCreateSuccessAction {
  type: typeof USER_FOLLOW_CREATE_SUCCEED;
  payload: Partial<UsersState>;
}

interface UserFollowCreateFailureAction {
  type: typeof USER_FOLLOW_CREATE_FAILURE;
  payload: Partial<UsersState>;
}

interface UserFollowDeleteRequestAction {
  type: typeof USER_FOLLOW_DELETE_REQUEST;
  payload: Partial<UsersState>;
}

interface UserFollowDeleteSuccessAction {
  type: typeof USER_FOLLOW_DELETE_SUCCEED;
  payload: Partial<UsersState>;
}

interface UserFollowDeleteFailureAction {
  type: typeof USER_FOLLOW_DELETE_FAILURE;
  payload: Partial<UsersState>;
}

interface UserUpdateDetailsAction {
  type: typeof USER_UPDATE_DETAILS;
  payload: Partial<UsersState>;
}

interface UserDeleteRequestAction {
  type: typeof USER_DELETE_REQUEST;
  payload: Partial<UsersState>;
}

interface UserDeleteSuccessAction {
  type: typeof USER_DELETE_SUCCEED;
  payload: Partial<UsersState>;
}

interface UserDeleteFailureAction {
  type: typeof USER_DELETE_FAILURE;
  payload: Partial<SessionState>;
}

export type UsersActions =
  | UsersLoadRequestAction
  | UsersLoadSuccessAction
  | UserLoadRequestAction
  | UserLoadSuccessAction
  | UserFollowCreateRequestAction
  | UserFollowCreateSuccessAction
  | UserFollowCreateFailureAction
  | UserFollowDeleteRequestAction
  | UserFollowDeleteSuccessAction
  | UserFollowDeleteFailureAction
  | UserUpdateDetailsAction
  | UserDeleteRequestAction
  | UserDeleteSuccessAction
  | UserDeleteFailureAction;
