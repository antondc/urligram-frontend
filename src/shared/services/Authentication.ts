import jwt from 'jsonwebtoken';

class Authentication {
  verifyToken = (token: string): unknown => {
    if (!token) return null;
    try {
      const tokenContent = jwt.verify(token, process.env.SECRET);

      return tokenContent;
    } catch (err) {
      return null;
    }
  };
}

export default Authentication;
