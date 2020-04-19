export const LOG_IN_STARTED = 'LOG_IN_STARTED';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const LOG_FAILED = 'LOG_FAILED';

export interface UserApiResponse {
  user: UserState;
}

export interface UserState {
  loading?: boolean;
  id?: string;
  order?: number;
  name?: string;
  email?: string;
  active?: boolean;
  level?: string;
  logged?: boolean;
  token?: string;
  iat?: number;
}

interface LogInFailureAction {
  type: typeof LOG_FAILED;
  data: {
    loading: false;
    error: string;
  };
}

interface LogInReceiveAction {
  type: typeof LOG_IN_SUCCESS;
  data: UserState;
}

interface LogInRequestAction {
  type: typeof LOG_IN_STARTED;
  data: {
    loading: true;
  };
}

interface LogOutReceiveAction {
  type: typeof LOG_OUT;
}

export type LogActionsTypes = LogInFailureAction | LogInReceiveAction | LogInRequestAction | LogOutReceiveAction;
