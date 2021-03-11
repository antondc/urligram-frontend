export const LOG_IN_STARTED = 'LOG_IN_STARTED';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const LOG_FAILED = 'LOG_FAILED';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

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
  level?: SessionLevel;
  logged?: boolean;
  token?: string;
  iat?: number;
  error?: SessionError;
}

export interface LogInRequest {
  nameOrEmail: string;
  password: string;
}

export interface LogInResponse {
  data: {
    attributes: SessionState;
  };
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  password_repeated: string;
}

export interface SignUpResponse {
  data: {
    success: boolean;
    error?: SessionError;
    attributes?: SessionState;
  };
}

interface LogInFailureAction {
  type: typeof LOG_FAILED;
  data: {
    loading: false;
    error: SessionError;
  };
}

interface LogInReceiveAction {
  type: typeof LOG_IN_SUCCESS;
  data: SessionState;
}

interface LogInRequestAction {
  type: typeof LOG_IN_STARTED;
  data: {
    loading: true;
  };
}

interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST;
  data: {
    loading: true;
  };
}

interface SignUpSucessAction {
  type: typeof SIGN_UP_SUCCESS;
  data: SessionState;
}

interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE;
  data: {
    loading: false;
    error: SessionError;
  };
}

interface LogOutReceiveAction {
  type: typeof LOG_OUT;
}

export type SessionActionsTypes =
  | LogInFailureAction
  | LogInReceiveAction
  | LogInRequestAction
  | LogOutReceiveAction
  | SignUpRequestAction
  | SignUpSucessAction
  | SignUpFailureAction;
