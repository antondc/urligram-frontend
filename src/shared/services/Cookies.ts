import UniversalCookie from 'universal-cookie';
import jwt from 'jsonwebtoken';
import config from '../../../config.test.json';

class Cookies {
  private cookies = new UniversalCookie();

  constructor() {}

  verifyCookies = (): boolean | null => {
    const token: string = this.cookies.get('sessionToken');
    if (!token) return null;
    try {
      jwt.verify(token, config.SECRET);
      return true;
    } catch (err) {
      return false;
    }
  };
}

export default Cookies;
