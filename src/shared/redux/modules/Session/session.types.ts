export const SESSION_LOG_IN_REQUEST = 'SESSION_LOG_IN_REQUEST';
export const SESSION_LOG_IN_SUCCESS = 'SESSION_LOG_IN_SUCCESS';
export const SESSION_LOG_IN_FAILURE = 'SESSION_LOG_IN_FAILURE';
export const SESSION_LOG_OUT_REQUEST = 'SESSION_LOG_OUT_REQUEST';
export const SESSION_LOG_OUT_SUCCESS = 'SESSION_LOG_OUT_SUCCESS';
export const SESSION_LOG_OUT_FAILURE = 'SESSION_LOG_OUT_FAILURE';
export const SESSION_SIGN_UP_REQUEST = 'SESSION_SIGN_UP_REQUEST';
export const SESSION_SIGN_UP_SUCCESS = 'SESSION_SIGN_UP_SUCCESS';
export const SESSION_SIGN_UP_FAILURE = 'SESSION_SIGN_UP_FAILURE';
export const SESSION_FORGOT_PASSWORD_REQUEST = 'SESSION_FORGOT_PASSWORD_REQUEST';
export const SESSION_FORGOT_PASSWORD_SUCCESS = 'SESSION_FORGOT_PASSWORD_SUCCESS';
export const SESSION_FORGOT_PASSWORD_FAILURE = 'SESSION_FORGOT_PASSWORD_FAILURE';
export const SESSION_RESET_PASSWORD_REQUEST = 'SESSION_RESET_PASSWORD_REQUEST';
export const SESSION_RESET_PASSWORD_SUCCESS = 'SESSION_RESET_PASSWORD_SUCCESS';
export const SESSION_RESET_PASSWORD_FAILURE = 'SESSION_RESET_PASSWORD_FAILURE';
export const SESSION_UPDATE_DETAILS_REQUEST = 'SESSION_UPDATE_DETAILS_REQUEST';
export const SESSION_UPDATE_DETAILS_SUCCESS = 'SESSION_UPDATE_DETAILS_SUCCESS';
export const SESSION_UPDATE_DETAILS_FAILURE = 'SESSION_UPDATE_DETAILS_FAILURE';
export const SESSION_RESET_ERRORS = 'SESSION_RESET_ERRORS';

export const SESSION_STATUS_ACTIVE = 'active';
export const SESSION_STATUS_INACTIVE = 'inactive';
const SESSION_STATUS_DISABLED = 'disabled';
const SESSION_STATUS_REMOVED = 'removed';

export type SessionStatus =
  | typeof SESSION_STATUS_ACTIVE
  | typeof SESSION_STATUS_INACTIVE
  | typeof SESSION_STATUS_DISABLED
  | typeof SESSION_STATUS_REMOVED;

type SessionLevel = 'admin' | 'user';

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
  followers?: string[];
  following?: string[];
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
    error: any;
  };
}

export interface SessionSignUpApiRequest {
  name: string;
  email: string;
  password: string;
  password_repeated: string;
}

export interface SessionSignUpApiResponse {
  data: {
    success: boolean;
    error?: SessionError;
    attributes?: SessionState;
  };
}

export interface SessionSignUpConfirmationApiRequest {
  name: string;
  token: string;
}

export interface SessionForgotPasswordApiRequest {
  nameOrEmail: string;
}

export interface SessionResetPasswordApiRequest {
  password: string;
  passwordRepeated: string;
  name: string;
  token: string;
}

export interface SessionResetPasswordApiResponse {
  data: {
    success: boolean;
    error?: SessionError;
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

interface LogOutRequestAction {
  type: typeof SESSION_LOG_OUT_REQUEST;
  payload: SessionState;
}

interface LogOutSuccessAction {
  type: typeof SESSION_LOG_OUT_SUCCESS;
  payload: SessionState;
}

interface LogOutFailureAction {
  type: typeof SESSION_LOG_OUT_FAILURE;
  payload: SessionState;
}

interface SignUpRequestAction {
  type: typeof SESSION_SIGN_UP_REQUEST;
  payload: SessionState;
}

interface SignUpSucessAction {
  type: typeof SESSION_SIGN_UP_SUCCESS;
  payload: SessionState;
}

interface SignUpFailureAction {
  type: typeof SESSION_SIGN_UP_FAILURE;
  payload: SessionState;
}

interface ResetPasswordRequestAction {
  type: typeof SESSION_RESET_PASSWORD_REQUEST;
  payload: SessionState;
}

interface ResetPasswordSucessAction {
  type: typeof SESSION_RESET_PASSWORD_SUCCESS;
  payload: SessionState;
}

interface ResetPasswordFailureAction {
  type: typeof SESSION_RESET_PASSWORD_FAILURE;
  payload: SessionState;
}

interface ForgotPasswordRequestAction {
  type: typeof SESSION_FORGOT_PASSWORD_REQUEST;
  payload: SessionState;
}

interface ForgotPasswordSuccessAction {
  type: typeof SESSION_FORGOT_PASSWORD_SUCCESS;
  payload: SessionState;
}

interface ForgotPasswordFailureAction {
  type: typeof SESSION_FORGOT_PASSWORD_FAILURE;
  payload: SessionState;
}

interface SessionUpdateDetailsRequestAction {
  type: typeof SESSION_UPDATE_DETAILS_REQUEST;
  payload: SessionState;
}

interface SessionUpdateDetailSuccessAction {
  type: typeof SESSION_UPDATE_DETAILS_SUCCESS;
  payload: SessionState;
}

interface SessionUpdateDetailsFailureAction {
  type: typeof SESSION_UPDATE_DETAILS_FAILURE;
  payload: SessionState;
}

interface SessionResetErrorsAction {
  type: typeof SESSION_RESET_ERRORS;
  payload: SessionState;
}

export type SessionActions =
  | LogInFailureAction
  | LogInSuccessAction
  | LogInRequestAction
  | LogOutRequestAction
  | LogOutSuccessAction
  | LogOutFailureAction
  | SignUpRequestAction
  | SignUpSucessAction
  | SignUpFailureAction
  | ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction
  | ResetPasswordRequestAction
  | ResetPasswordSucessAction
  | ResetPasswordFailureAction
  | SessionUpdateDetailsRequestAction
  | SessionUpdateDetailSuccessAction
  | SessionUpdateDetailsFailureAction
  | SessionResetErrorsAction;
