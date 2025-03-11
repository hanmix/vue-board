import axios, { type AxiosInstance } from 'axios';
import { useRouter } from 'vue-router';

const API_HOST = import.meta.env.VITE_API_HOST;
const router = useRouter();
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_HOST,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        router.push('/signIn');
      }
      // 필요에 따라 다른 상태 코드 처리
    }
    return Promise.reject(error);
  }
);
