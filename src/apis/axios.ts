import axios, { type AxiosInstance } from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;
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
    const status = error.response?.status;

    switch (status) {
      case 400:
        console.warn('잘못된 요청입니다.');
        break;
      case 401:
        console.warn('로그인이 필요합니다.');
        break;
      case 403:
        console.warn('접근 권한이 없습니다.');
        break;
      case 404:
        console.warn('요청한 리소스를 찾을 수 없습니다.');
        break;
      case 500:
        console.error('서버 에러 발생');
        break;
      default:
        console.error('알 수 없는 에러:', error.message);
    }

    error.__handledStatus = status;

    return Promise.reject(error);
  }
);
