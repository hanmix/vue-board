import type { ApiResponse, PaginationParams, PostListResponse } from '@/types';
import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

export const getPostsApi = async (
  params: PaginationParams
): Promise<ApiResponse<PostListResponse>> => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Cache-Control': 'no-cache',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const { data } = await axios.get<ApiResponse<PostListResponse>>(
      `${API_HOST}/api/posts`,
      { params, headers }
    );
    return data;
  } catch (error: any) {
    console.error('API 호출 에러:', error);
    throw error;
  }
};
