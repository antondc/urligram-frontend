import { Middleware, MiddlewareAPI, Action, AnyAction, Dispatch } from 'redux';
import Cookies, { INVALID } from '../../services/Cookies';
import actions from '../actions';
const cookies = new Cookies();

export const verifyCookiesMiddleWare: Middleware = ({ dispatch }: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (
  action: Action
) => {
  const token = cookies.getCookies('sessionToken');
  const tokenState = cookies.verifyToken(token);
  if (tokenState === INVALID) {
    dispatch(actions.logOut());
  }
  return next(action);
};
