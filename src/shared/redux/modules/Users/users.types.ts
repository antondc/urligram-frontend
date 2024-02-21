import { UnknownAction } from 'redux';

import { SessionState } from 'Modules/Session/session.types';
import { ListUserRole, ListUserStatus } from '../Lists/lists.types';

export const USERS_LOAD_REQUEST = 'USERS_LOAD_REQUEST';
export const USERS_LOAD_SUCCEED = 'USERS_LOAD_SUCCEED';
export const USERS_LOAD_FAILURE = 'USERS_LOAD_FAILURE';
export const USER_LOAD_REQUEST = 'USER_LOAD_REQUEST';
export const USER_LOAD_SUCCEED = 'USER_LOAD_SUCCEED';
export const USER_LOAD_FAILURE = 'USER_LOAD_FAILURE';
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

export enum UserAccountType {
  Basic = 'basic',
  Advanced = 'advanced',
}

export enum UserLevel {
  Admin = 'admin',
  User = 'user',
}

export const enum UserStatus {
  Inactive = 'inactive',
  Active = 'active',
  Disabled = 'disabled',
  Removed = 'removed',
}

export interface UserState {
  id: string;
  name: string;
  image: {
    original: string;
    w200h200?: string;
    w500h500?: string;
  };
  accountType: UserAccountType;
  level: UserLevel;
  email: string;
  status: UserStatus;
  statement: string;
  location: string;
  order: number;
  createdAt: number;
  updatedAt: number;
  followers?: string[];
  following?: string[];
  lists?: {
    id: number;
    userRole: ListUserRole;
    userListStatus?: ListUserStatus;
  }[];
  bookmarksIds?: number[];
  bookmarksPrivate?: number;
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

interface UsersLoadRequestAction extends UnknownAction {
  type: typeof USERS_LOAD_REQUEST;
  payload: Partial<UsersState>;
}

interface UsersLoadSuccessAction extends UnknownAction {
  type: typeof USERS_LOAD_SUCCEED;
  payload: Partial<UsersState>;
}

interface UsersLoadFailureAction extends UnknownAction {
  type: typeof USERS_LOAD_FAILURE;
  payload: Partial<UsersState>;
}

interface UserLoadRequestAction extends UnknownAction {
  type: typeof USER_LOAD_REQUEST;
  payload: Partial<UsersState>;
}

interface UserLoadSuccessAction extends UnknownAction {
  type: typeof USER_LOAD_SUCCEED;
  payload: Partial<UsersState>;
}

interface UserLoadFailureAction extends UnknownAction {
  type: typeof USER_LOAD_FAILURE;
  payload: Partial<UsersState>;
}

interface UserFollowCreateRequestAction extends UnknownAction {
  type: typeof USER_FOLLOW_CREATE_REQUEST;
  payload: Partial<UsersState>;
}

interface UserFollowCreateSuccessAction extends UnknownAction {
  type: typeof USER_FOLLOW_CREATE_SUCCEED;
  payload: Partial<UsersState>;
}

interface UserFollowCreateFailureAction extends UnknownAction {
  type: typeof USER_FOLLOW_CREATE_FAILURE;
  payload: Partial<UsersState>;
}

interface UserFollowDeleteRequestAction extends UnknownAction {
  type: typeof USER_FOLLOW_DELETE_REQUEST;
  payload: Partial<UsersState>;
}

interface UserFollowDeleteSuccessAction extends UnknownAction {
  type: typeof USER_FOLLOW_DELETE_SUCCEED;
  payload: Partial<UsersState>;
}

interface UserFollowDeleteFailureAction extends UnknownAction {
  type: typeof USER_FOLLOW_DELETE_FAILURE;
  payload: Partial<UsersState>;
}

interface UserUpdateDetailsAction extends UnknownAction {
  type: typeof USER_UPDATE_DETAILS;
  payload: Partial<UsersState>;
}

interface UserDeleteRequestAction extends UnknownAction {
  type: typeof USER_DELETE_REQUEST;
  payload: Partial<UsersState>;
}

interface UserDeleteSuccessAction extends UnknownAction {
  type: typeof USER_DELETE_SUCCEED;
  payload: Partial<UsersState>;
}

interface UserDeleteFailureAction extends UnknownAction {
  type: typeof USER_DELETE_FAILURE;
  payload: Partial<SessionState>;
}

export type UsersActions =
  | UsersLoadRequestAction
  | UsersLoadSuccessAction
  | UsersLoadFailureAction
  | UserLoadRequestAction
  | UserLoadSuccessAction
  | UserLoadFailureAction
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
