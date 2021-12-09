import jwt, { JwtPayload } from 'jsonwebtoken';

export class TokenService {
  createToken(string: unknown): string | JwtPayload {
    const token = jwt.sign(JSON.stringify(string), process.env.SECRET);

    return token;
  }

  decodeToken<T>(string: string): T {
    if (!string) return null;

    const token = jwt.verify(string, process.env.SECRET) as T;

    return token;
  }
}
