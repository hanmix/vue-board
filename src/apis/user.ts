import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;

// 유저 전체 조회
export const getUsers = async () => {
  const response = await axios.get(`${API_HOST}/api/users`);
  return response.data;
};

// 유저 정보 조회
export const getUserById = async (id: string, token: string) => {
  const response = await axios.get(`${API_HOST}/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
