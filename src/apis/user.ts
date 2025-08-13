import type { ApiResponse, User } from '@/types';
import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

// 유저 전체 조회
export const getUsersApi = async (): Promise<ApiResponse<User[]>> => {
  const response = await axios.get<ApiResponse<User[]>>(
    `${API_HOST}/api/users`
  );
  return response.data;
};

// 유저 정보 조회
export const getUserByIdApi = async (
  id: string
): Promise<ApiResponse<User>> => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Cache-Control': 'no-cache',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.get<ApiResponse<User>>(
    `${API_HOST}/api/users/${id}`,
    { headers }
  );
  return response.data;
};
