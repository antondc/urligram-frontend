import jwt, { JwtPayload } from 'jsonwebtoken';

import config from 'Root/config.test.json';

export class TokenService {
  createToken(string: unknown): string | JwtPayload {
    const token = jwt.sign(JSON.stringify(string), config.SECRET);

    return token;
  }

  decodeToken(string: string): string | JwtPayload {
    if (!string) return null;

    const token = jwt.verify(string, config.SECRET);

    return token;
  }
}
