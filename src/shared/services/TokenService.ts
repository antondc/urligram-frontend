import jwt, { JwtPayload } from 'jsonwebtoken';

import { SECRET } from 'Root/src/server/env';

export class TokenService {
  createToken(string: unknown): string | JwtPayload {
    const token = jwt.sign(JSON.stringify(string), SECRET);

    return token;
  }

  decodeToken(string: string): string | JwtPayload {
    if (!string) return null;

    const token = jwt.verify(string, SECRET);

    return token;
  }
}
