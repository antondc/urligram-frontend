import { Middleware, MiddlewareAPI, Action, AnyAction, Dispatch } from 'redux';
import Cookies from '../../services/Cookies';
import actions from '../actions';
const cookies = new Cookies();

export const verifyCookies: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (
  action: Action
) => {
  const isCookieValid = cookies.verifyCookies();
  if (isCookieValid === null) {
    return next(action);
  } else if (isCookieValid === false) {
    dispatch(actions.logOut());
  }
  return next(action);
};
