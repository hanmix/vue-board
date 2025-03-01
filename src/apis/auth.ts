import axios from 'axios';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  CheckIdResponse,
} from '@/types';

const API_HOST = import.meta.env.VITE_API_HOST;

export const loginApi = async (
  payload: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  const response = await axios.post<ApiResponse<LoginResponse>>(
    `${API_HOST}/api/auth/login`,
    payload
  );
  return response.data;
};

export const registerApi = async (
  payload: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> => {
  const response = await axios.post<ApiResponse<RegisterResponse>>(
    `${API_HOST}/api/auth/register`,
    payload
  );
  return response.data;
};

export const checkIdApi = async (
  id: string
): Promise<ApiResponse<CheckIdResponse>> => {
  const response = await axios.get<ApiResponse<CheckIdResponse>>(
    `${API_HOST}/api/auth/check-id`,
    { params: { id } }
  );
  return response.data;
};
