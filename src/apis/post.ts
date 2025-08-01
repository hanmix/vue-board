import type {
  ApiResponse,
  PaginationParams,
  PostDetailResponse,
  PostListResponse,
} from '@/types';
import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

// 게시글 전체 조회
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

// 내 게시글 조회
export const getMyPostsApi = async (
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
      `${API_HOST}/api/posts/my`,
      { params, headers }
    );
    return data;
  } catch (error: any) {
    console.error('API 호출 에러:', error);
    throw error;
  }
};

// 게시글 상세 조회
export const getPostByIdApi = async (
  id: string
): Promise<ApiResponse<PostDetailResponse>> => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Cache-Control': 'no-cache',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const { data } = await axios.get<ApiResponse<PostDetailResponse>>(
      `${API_HOST}/api/posts/${id}`,
      { headers }
    );
    return data;
  } catch (error: any) {
    console.error('API 호출 에러:', error);
    throw error;
  }
};
