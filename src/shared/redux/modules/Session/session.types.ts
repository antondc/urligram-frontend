export const SESSION_LOG_IN_REQUEST = 'SESSION_LOG_IN_REQUEST';
export const SESSION_LOG_IN_SUCCESS = 'SESSION_LOG_IN_SUCCESS';
export const SESSION_LOG_IN_FAILURE = 'SESSION_LOG_IN_FAILURE';
export const SESSION_LOG_OUT_REQUEST = 'SESSION_LOG_OUT_REQUEST';
export const SESSION_ERROR_CLEAR = 'SESSION_ERROR_CLEAR';

export const SESSION_STATUS_ACTIVE = 'active';
export const SESSION_STATUS_INACTIVE = 'inactive';
export const SESSION_STATUS_DISABLED = 'disabled';
export const SESSION_STATUS_REMOVED = 'removed';

export type SessionStatus =
  | typeof SESSION_STATUS_ACTIVE
  | typeof SESSION_STATUS_INACTIVE
  | typeof SESSION_STATUS_DISABLED
  | typeof SESSION_STATUS_REMOVED;

export type SessionLevel = 'admin' | 'user';

export interface SessionError extends Error {
  field: string;
}

export interface SessionState {
  loading?: boolean;
  id?: string;
  order?: number;
  name?: string;
  email?: string;
  status?: SessionStatus;
  statement?: string;
  level?: SessionLevel;
  logged?: boolean;
  location?: string;
  image?: {
    original: string;
    w200h200?: string;
    w500h500?: string;
  };
  token?: string;
  iat?: number;
  errors?: SessionError[];
  passwordRequested?: boolean;
  passwordReset?: boolean;
}

// Api -----
export interface SessionLogInApiRequest {
  nameOrEmail: string;
  password: string;
}

export interface SessionLogInApiResponse {
  data: {
    attributes: SessionState;
  };
}

// Actions -----

interface LogInRequestAction {
  type: typeof SESSION_LOG_IN_REQUEST;
  payload: SessionState;
}

interface LogInSuccessAction {
  type: typeof SESSION_LOG_IN_SUCCESS;
  payload: SessionState;
}

interface LogInFailureAction {
  type: typeof SESSION_LOG_IN_FAILURE;
  payload: SessionState;
}

interface LogOutReceiveAction {
  type: typeof SESSION_LOG_OUT_REQUEST;
  payload: SessionState;
}

interface SessionErrorClearAction {
  type: typeof SESSION_ERROR_CLEAR;
  payload: SessionState;
}

export type SessionActions =
  | LogInFailureAction
  | LogInSuccessAction
  | LogInRequestAction
  | LogOutReceiveAction
  | SessionErrorClearAction;
