export const LOG_IN_STARTED = 'LOG_IN_STARTED';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const LOG_FAILED = 'LOG_FAILED';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

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
  errors?: SessionError[];
  passwordRequested?: boolean;
  passwordReset?: boolean;
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

export interface SignUpConfirmationRequest {
  name: string;
  token: string;
}

export interface ForgotPasswordRequest {
  nameOrEmail: string;
}

export interface ForgotPasswordResponse {
  data: {
    success: boolean;
    error?: SessionError;
  };
}

export interface ResetPasswordRequest {
  password: string;
  passwordRepeated: string;
  name: string;
  token: string;
}

export interface ResetPasswordResponse {
  data: {
    success: boolean;
    error?: SessionError;
    attributes: SessionState;
  };
}

interface LogInRequestAction {
  type: typeof LOG_IN_STARTED;
  data: {
    loading: true;
  };
}

interface LogInSuccessAction {
  type: typeof LOG_IN_SUCCESS;
  data: SessionState;
}

interface LogInFailureAction {
  type: typeof LOG_FAILED;
  data: {
    loading: false;
    error: SessionError;
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

interface ResetPasswordRequestAction {
  type: typeof RESET_PASSWORD_REQUEST;
  data: {
    loading: true;
  };
}

interface ResetPasswordSucessAction {
  type: typeof RESET_PASSWORD_SUCCESS;
  data: {
    loading: false;
  };
}

interface ResetPasswordFailureAction {
  type: typeof RESET_PASSWORD_FAILURE;
  data: {
    loading: false;
    error: SessionError;
  };
}

interface LogOutReceiveAction {
  type: typeof LOG_OUT;
}

interface ForgotPasswordRequestAction {
  type: typeof FORGOT_PASSWORD_REQUEST;
}

interface ForgotPasswordSuccessAction {
  type: typeof FORGOT_PASSWORD_SUCCESS;
}

interface ForgotPasswordFailureAction {
  type: typeof FORGOT_PASSWORD_FAILURE;
  data: {
    error: SessionError;
  };
}

export type SessionActionsTypes =
  | LogInFailureAction
  | LogInSuccessAction
  | LogInRequestAction
  | LogOutReceiveAction
  | SignUpRequestAction
  | SignUpSucessAction
  | SignUpFailureAction
  | ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction
  | ResetPasswordRequestAction
  | ResetPasswordSucessAction
  | ResetPasswordFailureAction;
