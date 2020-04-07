export const LOG_IN_STARTED = 'LOG_IN_STARTED';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export const LOG_FAILED = 'LOG_FAILED';

export interface UserApiResponse {
  status: 'ok' | 'error';
  user: User;
}

export interface User {
  id: string;
  order: number;
  name: string;
  email: string;
  active: boolean;
  level: string;
  logged: boolean;
  token?: string;
  iat: number;
}
