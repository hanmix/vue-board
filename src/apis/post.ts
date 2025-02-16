import axios from "axios";

const API_HOST = import.meta.env.VUE_APP_API_HOST;

export const getPosts = async (
  params: { page: number; size: number; type: string; keyword: string },
  token: string
) => {
  const response = await axios.get(`${API_HOST}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
  return response.data;
};

export const getPostById = async (postId: string, token: string) => {
  const response = await axios.get(`${API_HOST}/api/posts/${postId}`, {
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
