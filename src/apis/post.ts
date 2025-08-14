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
  try {
    const { data } = await axiosInstance.get<ApiResponse<PostListResponse>>(
      `${API_HOST}/api/posts`,
      { params }
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
  try {
    const { data } = await axiosInstance.get<ApiResponse<PostListResponse>>(
      `${API_HOST}/api/posts/my`,
      { params }
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
  try {
    const { data } = await axiosInstance.get<ApiResponse<PostDetailResponse>>(
      `${API_HOST}/api/posts/${id}`
    );
    return data;
  } catch (error) {
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

// 게시글 수정
export const updatePostApi = async (
  postId: string,
  title: string,
  content: string
): Promise<ApiResponse<Post>> => {
  const payload = { title, content };
  try {
    const response = await axiosInstance.put<ApiResponse<Post>>(
      `${API_HOST}/api/posts/${postId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error('게시글 수정 에러', error);
    throw error;
  }
};

// 게시글 삭제
export const deletePostApi = async (
  postId: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<void>>(
      `${API_HOST}/api/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error('게시글 삭제 에러', error);
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
