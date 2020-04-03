import UniversalCookie from 'universal-cookie';
import jwt from 'jsonwebtoken';
import config from '../../../config.test.json';

export const EMPTY = 'empty';
export const INVALID = 'invalid';

type CookieRetrievalResult = string | typeof EMPTY | typeof INVALID;
type TokenValidationResult = {} | typeof EMPTY | typeof INVALID;

class Cookies {
  private cookies = new UniversalCookie();
  constructor() {}

  getCookie = (cookieName: string): CookieRetrievalResult => {
    const cookie: string = this.cookies.get(cookieName);
    if (!cookie) return EMPTY;

    return cookie;
  };

  setCookie = (cookieName: string, content: string): void => {
    const stringifiedContent = JSON.stringify(content);

    this.cookies.set(cookieName, stringifiedContent, {
      maxAge: config.SESSION_DURATION,
      path: '/',
    });
  };

  removeCookie = (cookieName: string): void => {
    this.cookies.remove(cookieName, {
      path: '/',
    });
  };

  verifyToken = (token: string): TokenValidationResult => {
    if (!token || token === EMPTY) return EMPTY;
    try {
      const cookieContent = jwt.verify(token, config.SECRET);
      return cookieContent;
    } catch (err) {
      return INVALID;
    }
  };
}

export default Cookies;
