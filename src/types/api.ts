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
