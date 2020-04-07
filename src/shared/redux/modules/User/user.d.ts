export interface User {
  id: string;
  order: number;
  name: string;
  email: string;
  active: boolean;
  level: string;
  logged: boolean;
  token?: string;
  iat: number;
}
