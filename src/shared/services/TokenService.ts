import jwt, { JwtPayload } from 'jsonwebtoken';

export class TokenService {
  createToken(string: unknown): string | JwtPayload {
    const token = jwt.sign(JSON.stringify(string), process.env.SECRET);

    return token;
  }

  decodeToken(string: string): string | JwtPayload {
    if (!string) return null;

    const token = jwt.verify(string, process.env.SECRET);

    return token;
  }
}
