import UniversalCookie from 'universal-cookie';
import jwt from 'jsonwebtoken';
import config from '../../../config.test.json';

export const COOKIE_EMPTY = 'empty';
export const COOKIE_VALID = 'valid';
export const COOKIE_INVALID = 'invalid';

type CookieState = typeof COOKIE_EMPTY | typeof COOKIE_VALID | typeof COOKIE_INVALID;

class Cookies {
  private cookies = new UniversalCookie();
  public state: CookieState;
  constructor() {}

  verifyCookies = (): CookieState => {
    const token: string = this.cookies.get('sessionToken');
    if (!token) return COOKIE_EMPTY;
    try {
      jwt.verify(token, config.SECRET);
      return COOKIE_VALID;
    } catch (err) {
      return COOKIE_INVALID;
    }
  };
}

export default Cookies;
