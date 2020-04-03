import jwt from 'jsonwebtoken';
import config from '../../../config.test.json';

export const EMPTY = 'empty';
export const INVALID = 'invalid';

type CookieRemoveResult = void | typeof EMPTY;
type CookieRetrievalResult = string | typeof EMPTY;
type TokenValidationResult = {} | typeof EMPTY | typeof INVALID;

class Cookies {
  constructor() {}

  findCookie = (cookieName: string): string | undefined => {
    if (!isBrowser) return;

    const cookieStartsWith = cookieName + '=';
    const decodedCookies = decodeURIComponent(document.cookie);
    const decodedCookiesArray = decodedCookies.split(';');
    const cookiesArray = decodedCookiesArray.map(item => item.trim());
    const cookie = cookiesArray.find(item => item.startsWith(cookieStartsWith));
    return cookie;
  };

  getCookie = (cookieName: string | typeof EMPTY): CookieRetrievalResult => {
    if (!isBrowser) return;

    const cookie = this.findCookie(cookieName);

    if (!cookie) return EMPTY;

    const cookieContent = cookie.split('=')[1];

    return cookieContent;
  };

  setCookie = (cookieName: string, content: string): void => {
    if (!isBrowser) return;

    const stringifiedContent = content;
    const today = new Date();
    today.setSeconds(today.getSeconds() + config.SESSION_DURATION);
    var expires = 'expires=' + today.toUTCString();

    const cookie = cookieName + '=' + stringifiedContent + ';' + expires + '; path=/';
    document.cookie = cookie;
  };

  removeCookie = (cookieName: string): CookieRemoveResult => {
    if (!isBrowser) return;

    const cookie = this.findCookie(cookieName);

    if (!cookie) return EMPTY;

    var expiredDate = 'expires=' + 'Thu, 01 Jan 1970 00:00:00 UTC';
    const expiredCookie = cookieName + '=;' + expiredDate + '; path=/';

    document.cookie = expiredCookie;
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
