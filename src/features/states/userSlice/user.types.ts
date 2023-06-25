import { type JWTToken, type User } from '~/entities/User';

export interface UserSlice {
  currentUser:
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: User }
    | { status: 'error'; error: string };
  tokens:
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: JWTToken }
    | { status: 'error'; error: string };
}

export interface CreateTokenPayload {
  email: string;
  password: string;
}
