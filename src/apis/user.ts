import type { ApiResponse, User } from '@/types';
import { axiosInstance } from '@/apis';

const API_HOST = import.meta.env.VITE_API_HOST;

// 유저 전체 조회
export const getUsersApi = async (): Promise<ApiResponse<User[]>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<User[]>>(
      `${API_HOST}/api/users`
    );
    return response.data;
  } catch (error) {
    console.error('유저 전체 조회 에러', error);
    throw error;
  }
};

// 유저 정보 조회
export const getUserByIdApi = async (
  id: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<User>>(
      `${API_HOST}/api/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('유저 정보 조회 에러', error);
    throw error;
  }
};
