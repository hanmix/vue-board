import axios from 'axios';
import type { ApiResponse, PaginationParams } from '@/types'; // ApiResponse<T>는 auth 타입 정의 파일에 있음
import type {
  Post,
  PostListResponse,
  CreatePostRequest,
  UpdatePostRequest,
  ReplyPostRequest,
} from '@/types/post';

const API_HOST = import.meta.env.VITE_API_HOST;

export const getPostsApi = async (
  params: PaginationParams
): Promise<ApiResponse<PostListResponse>> => {
  const token = localStorage.getItem('token');
  const response = await axios.get<ApiResponse<PostListResponse>>(
    `${API_HOST}/api/posts`,
    {
      params: params,
      headers: {
        // 토큰이 있을 경우 Bearer 토큰 형식으로 전송
        Authorization: token ? `Bearer ${token}` : '',
        'Cache-Control': 'no-cache',
      },
    }
  );
  return response.data;
};

export const getMyPostsApi = async (
  page: number,
  size: number,
  type: string,
  keyword: string
): Promise<ApiResponse<PostListResponse>> => {
  const response = await axios.get<ApiResponse<PostListResponse>>(
    `${API_HOST}/api/posts/my`,
    {
      params: { page, size, type, keyword },
    }
  );
  return response.data;
};

export const getPostApi = async (
  postId: string
): Promise<ApiResponse<Post>> => {
  const response = await axios.get<ApiResponse<Post>>(
    `${API_HOST}/api/posts/${postId}`
  );
  return response.data;
};

export const createPostApi = async (
  payload: CreatePostRequest
): Promise<ApiResponse<Post>> => {
  const response = await axios.post<ApiResponse<Post>>(
    `${API_HOST}/api/posts`,
    payload
  );
  return response.data;
};

export const replyPostApi = async (
  postId: string,
  payload: ReplyPostRequest
): Promise<ApiResponse<any>> => {
  const response = await axios.post<ApiResponse<any>>(
    `${API_HOST}/api/posts/${postId}/reply`,
    payload
  );
  return response.data;
};

export const updatePostApi = async (
  postId: string,
  payload: UpdatePostRequest
): Promise<ApiResponse<Post>> => {
  const response = await axios.put<ApiResponse<Post>>(
    `${API_HOST}/api/posts/${postId}`,
    payload
  );
  return response.data;
};

export const increaseViewApi = async (
  postId: string
): Promise<ApiResponse<any>> => {
  const response = await axios.put<ApiResponse<any>>(
    `${API_HOST}/api/posts/${postId}/view`
  );
  return response.data;
};

export const likePostApi = async (
  postId: string
): Promise<ApiResponse<any>> => {
  const response = await axios.put<ApiResponse<any>>(
    `${API_HOST}/api/posts/${postId}/like`
  );
  return response.data;
};

export const dislikePostApi = async (
  postId: string
): Promise<ApiResponse<any>> => {
  const response = await axios.put<ApiResponse<any>>(
    `${API_HOST}/api/posts/${postId}/dislike`
  );
  return response.data;
};

export const deletePostApi = async (
  postId: string
): Promise<ApiResponse<any>> => {
  const response = await axios.delete<ApiResponse<any>>(
    `${API_HOST}/api/posts/${postId}`
  );
  return response.data;
};
