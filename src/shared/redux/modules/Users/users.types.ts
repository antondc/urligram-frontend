export const LOAD_USERS_STARTED = 'LOAD_USERS_STARTED';
export const LOAD_USERS_SUCEEDED = 'LOAD_USERS_SUCEEDED';
export const USER_LOAD_STARTED = 'USER_LOAD_STARTED';
export const USER_LOAD_SUCEEDED = 'LOAD_USER_SUCEEDED';

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
  createdAt: Date | string;
  updatedAt: Date | string;
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
}

interface RequestUsersAction {
  type: typeof LOAD_USERS_STARTED;
  data: {
    loading: true;
  };
}

interface ReceiveUsersAction {
  type: typeof LOAD_USERS_SUCEEDED;
  data: UsersState;
}

export interface ReceiveUserItem {
  type: 'user';
  id: string;
  attributes: UserState;
}

export interface ReceiveUsersResponse {
  data: ReceiveUserItem[];
}

export interface ReceiveUserResponse {
  data: ReceiveUserItem;
}

interface UserRequestAction {
  type: typeof USER_LOAD_STARTED;
  data: {
    loading: true;
  };
}

interface UserReceiveAction {
  type: typeof USER_LOAD_SUCEEDED;
  data: UsersState;
}

export type UsersActionsTypes = RequestUsersAction | ReceiveUsersAction | UserRequestAction | UserReceiveAction;
