export const USERS_LOAD_REQUEST = 'USERS_LOAD_REQUEST';
export const USERS_LOAD_SUCCEED = 'USERS_LOAD_SUCCEED';
export const USER_LOAD_REQUEST = 'USER_LOAD_REQUEST';
export const USER_LOAD_SUCCEED = 'USER_LOAD_SUCCEED';

export interface UserState {
  id: string;
  name: string;
  image: string;
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
    userRole: string;
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

export type UsersActions =
  | UsersLoadRequestAction
  | UsersLoadSuccessAction
  | UserLoadRequestAction
  | UserLoadSuccessAction;
