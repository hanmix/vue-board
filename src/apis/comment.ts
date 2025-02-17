import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

export const getCommentsByPostId = async (postId: string, token: string) => {
  const response = await axios.get(`${API_HOST}/api/comments/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createComment = async (
  postId: string,
  content: string,
  to: string,
  token: string
) => {
  const response = await axios.post(
    `${API_HOST}/api/comments/posts/${postId}`,
    { content, to },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const updateComment = async (
  commentId: string,
  content: string,
  token: string
) => {
  const response = await axios.put(
    `${API_HOST}/api/comments/${commentId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const deleteComment = async (commentId: string, token: string) => {
  const response = await axios.delete(`${API_HOST}/api/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
