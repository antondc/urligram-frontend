import { Middleware, MiddlewareAPI, Action, AnyAction, Dispatch } from 'redux';
import Cookies, { COOKIE_INVALID } from '../../services/Cookies';
import actions from '../actions';
const cookies = new Cookies();

export const verifyCookiesMiddleWare: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (
  action: Action
) => {
  const cookieState = cookies.verifyCookies();
  if (cookieState === COOKIE_INVALID) {
    dispatch(actions.logOut());
  }
  return next(action);
};
