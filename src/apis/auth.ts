import axios from 'axios';
import type { AuthResponse, LoginData, RegisterData } from '@/types';

const API_HOST = import.meta.env.VITE_API_HOST;

export const login = async (email: string, password: string) => {
  const response = await axios.post<AuthResponse, any, LoginData>(
    `${API_HOST}/api/auth/login`,
    {
      email,
      password,
    }
  );
  return response.data;
};

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const response = await axios.post<AuthResponse, any, RegisterData>(
    `${API_HOST}/api/auth/register`,
    {
      email,
      password,
      name,
    }
  );
  return response.data;
};

export const checkId = async (id: string) => {
  const response = await axios.get(`${API_HOST}/api/auth/check-id`, {
    params: { id },
  });
  return response.data;
};
