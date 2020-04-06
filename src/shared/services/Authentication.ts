import jwt from 'jsonwebtoken';
import config from '../../../config.test.json';

class Authentication {
  verifyToken = (token: string): {} | null => {
    if (!token) return null;
    try {
      const tokenContent = jwt.verify(token, config.SECRET);
      return tokenContent;
    } catch (err) {
      return null;
    }
  };
}

export default Authentication;
