import { ref } from 'vue';
import { defineStore } from 'pinia';
import { loginApi, registerApi, checkIdApi } from '@/apis';
import type { LoginRequest, RegisterRequest } from '@/types';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('auth', () => {
  const router = useRouter();
  const name = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const doubleCheckPassword = ref<string>('');
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<{ email: string; name: string } | null>(null);
  const isAuthenticated = ref<boolean>(!!token.value);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const payload: LoginRequest = { email, password };
      const { isSuccess, message, data } = await loginApi(payload);
      if (!isSuccess) throw (error.value = message || '로그인에 실패했습니다.');

      token.value = data.token;
      localStorage.setItem('token', token.value);
      isAuthenticated.value = true;
    } catch {
      error.value = '로그인 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const payload: RegisterRequest = { email, password, name };
      const { isSuccess, message, data } = await registerApi(payload);
      if (!isSuccess)
        throw (error.value = message || '회원가입에 실패했습니다.');

      token.value = data.token;
      localStorage.setItem('token', token.value);
      isAuthenticated.value = true;
    } catch {
      error.value = '회원가입 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const checkId = async (id: string): Promise<boolean> => {
    try {
      const {
        isSuccess,
        message,
        data: { isUserExist },
      } = await checkIdApi(id);
      if (!isSuccess) throw message || '아이디 중복 확인을 실패하였습니다.';

      return isUserExist;
    } catch (err: any) {
      error.value = '아이디 확인 중 오류가 발생했습니다.';
      return false;
    }
  };

  const logout = (): void => {
    token.value = null;
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
    router.push('/signIn');
  };

  return {
    name,
    email,
    password,
    doubleCheckPassword,
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
