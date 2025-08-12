import type {
  ApiResponse,
  CreatePostRequest,
  CreatePostResponse,
  PaginationParams,
  Post,
  PostDetailResponse,
  PostListResponse,
} from '@/types';
import { axiosInstance } from './axios';

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
    const { data } = await axiosInstance.get<ApiResponse<PostListResponse>>(
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
    const { data } = await axiosInstance.get<ApiResponse<PostListResponse>>(
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
    const { data } = await axiosInstance.get<ApiResponse<PostDetailResponse>>(
      `${API_HOST}/api/posts/${id}`,
      { headers }
    );
    return data;
  } catch (error: any) {
    console.error('API 호출 에러:', error);
    throw error;
  }
};

// 게시글 생성
export const createPostApi = async (
  payload: CreatePostRequest
): Promise<ApiResponse<CreatePostResponse>> => {
  try {
    const response = await axiosInstance.post<ApiResponse<CreatePostResponse>>(
      `${API_HOST}/api/posts`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('게시글 생성 에러', error);
    throw error;
  }
};

// 답글 생성
export const createReplyApi = async (
  postId: string,
  title: string,
  content: string
): Promise<ApiResponse<Post>> => {
  const payload = { title, content };
  try {
    const resposnse = await axiosInstance.post<ApiResponse<Post>>(
      `${API_HOST}/api/posts/${postId}/reply`,
      payload
    );
    return resposnse.data;
  } catch (error) {
    console.error('답글 생성 에러', error);
    throw error;
  }
};
