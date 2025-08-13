import type { User } from './user';

export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  token: string;
}

export interface CheckIdResponse {
  isUserExist: boolean;
}
