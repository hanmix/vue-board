import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { loginApi, registerApi, checkIdApi } from '@/apis';
import type { LoginRequest, RegisterRequest } from '@/types';
import { useRouter } from 'vue-router';

export const useUser = () => {
  const userStore = useUserStore();
  const {
    name,
    email,
    password,
    doubleCheckPassword,
    loading,
    error,
    isAuthenticated,
    token,
    user,
  } = storeToRefs(userStore);
  const { setToken } = userStore;
  const router = useRouter();

  const login = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const payload: LoginRequest = { email, password };
      const { isSuccess, message, data } = await loginApi(payload);
      if (!isSuccess) throw (error.value = message || '로그인에 실패했습니다.');

      setToken(data.token);
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

      setToken(data.token);
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
    localStorage.removeItem('token');
    router.push('/signIn');
  };
  return {
    name,
    email,
    password,
    doubleCheckPassword,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    checkId,
    logout,
  };
};
