import type { PostResponse, PaginationParams, Post } from '@/types';
import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

export const getPosts = async (params: PaginationParams, token: string) => {
  const response = await axios.get<PostResponse<Post[]>>(
    `${API_HOST}/api/posts`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }
  );
  return response.data;
};

export const getPostById = async (postId: string, token: string) => {
  const response = await axios.get<Post>(`${API_HOST}/api/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createPost = async (
  title: string,
  content: string,
  token: string
) => {
  const response = await axios.post(
    `${API_HOST}/api/posts`,
    { title, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const updatePost = async (
  postId: string,
  title: string,
  content: string,
  token: string
) => {
  const response = await axios.put(
    `${API_HOST}/api/posts/${postId}`,
    { title, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deletePost = async (postId: string, token: string) => {
  const response = await axios.delete(`${API_HOST}/api/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
