import axios from "axios";

const API_HOST = import.meta.env.VUE_APP_API_HOST;

export const getUsers = async () => {
  const response = await axios.get(`${API_HOST}/api/users`);
  return response.data;
};

export const getUserById = async (id: string, token: string) => {
  const response = await axios.get(`${API_HOST}/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
