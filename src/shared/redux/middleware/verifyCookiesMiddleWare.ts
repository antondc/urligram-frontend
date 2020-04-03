import { Middleware, MiddlewareAPI, Action, AnyAction, Dispatch } from 'redux';
import Cookies, { INVALID, EMPTY } from '../../services/Cookies';
import actions from '../actions';
const cookies = new Cookies();

export const verifyCookiesMiddleWare: Middleware = ({ getState }: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (
  action: Action
) => {
  const user = !!getState().UserSession.id; // TODO: replace to a getUser selector
  const token = cookies.getCookie('sessionToken');
  const tokenState = cookies.verifyToken(token);
  const noTokenButUserLoggedIn = token === EMPTY && user;
  const tokenInvalid = tokenState === INVALID;

  if (tokenInvalid || noTokenButUserLoggedIn) {
    next(actions.logOut());
  }
  return next(action);
};
