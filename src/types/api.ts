import type { PageInfo } from './pagination';

export interface AuthResponse {
  isSuccess: boolean;
  data: { token: string };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface PostResponse<T> {
  isSuccess: Boolean;
  message: string;
  data: T;
  pageInfo: PageInfo;
}
