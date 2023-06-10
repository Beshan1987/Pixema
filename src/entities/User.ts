export interface User {
  username: string;
  id: number;
  email: string;
}

export interface JWTToken {
  access: string;
  refresh: string;
}
