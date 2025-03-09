import { ref } from 'vue';
import { defineStore } from 'pinia';
import { loginApi, registerApi, checkIdApi } from '@/apis';
import type { LoginRequest, RegisterRequest } from '@/types';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('auth', () => {
  const router = useRouter();
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<{ email: string; name: string } | null>(null);
  const isAuthenticated = ref(!!token.value);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const payload: LoginRequest = { email, password };
      const { isSuccess, message, data } = await loginApi(payload);
      if (isSuccess) {
        token.value = data.token;
        localStorage.setItem('token', token.value);
        isAuthenticated.value = true;
      } else {
        error.value = message || '로그인에 실패했습니다.';
      }
    } catch (err: any) {
      error.value = err.message || '로그인 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    loading.value = true;
    error.value = null;
    try {
      const payload: RegisterRequest = { email, password, name };
      const response = await registerApi(payload);
      if (response.isSuccess) {
        token.value = response.data.token;
        localStorage.setItem('TOKEN', token.value);
        isAuthenticated.value = true;
      } else {
        error.value = response.message || '회원가입에 실패했습니다.';
      }
    } catch (err: any) {
      error.value = err.message || '회원가입 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const checkId = async (id: string): Promise<boolean> => {
    try {
      const response = await checkIdApi(id);
      return response.isSuccess;
    } catch (err: any) {
      error.value = err.message || '아이디 확인 중 오류가 발생했습니다.';
      return false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
    router.push('/');
  };

  return {
    token,
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    checkId,
    logout,
  };
});
