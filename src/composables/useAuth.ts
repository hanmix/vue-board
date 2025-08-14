import { computed } from 'vue';
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';
import type { LoginRequest, RegisterRequest } from '@/types';
import { checkIdApi, loginApi, registerApi } from '@/apis';
import { parseJwt } from '@/utils';

export const useAuth = () => {
  const authStore = useAuthStore();

  const {
    name,
    email,
    password,
    doubleCheckPassword,
    loading,
    error,
    isAuthenticated,
    token,
    tokenUserInfo,
  } = storeToRefs(authStore);
  const { setToken, setUserInfo } = authStore;

  const isEmptyName = computed<boolean>(() => name.value.trim() === '');
  const isEmptyEmail = computed<boolean>(() => email.value.trim() === '');
  const isEmptyPassword = computed<boolean>(() => password.value.trim() === '');
  const isEmptyDoubleCheckPassword = computed<boolean>(
    () => doubleCheckPassword.value.trim() === ''
  );
  const isPasswordMatch = computed<boolean>(
    () => password !== doubleCheckPassword
  );

  const login = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const payload: LoginRequest = { email, password };
      const { isSuccess, message, data } = await loginApi(payload);
      if (!isSuccess) throw (error.value = message || '로그인에 실패했습니다.');

      token.value = data.token;
      setToken(token.value);
      tokenUserInfo.value = parseJwt(token.value);
      setUserInfo(tokenUserInfo.value.id);
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
    tokenUserInfo.value = null;
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('userId');
  };

  return {
    name,
    email,
    password,
    doubleCheckPassword,
    isEmptyName,
    isEmptyEmail,
    isEmptyPassword,
    isEmptyDoubleCheckPassword,
    isPasswordMatch,
    token,
    isAuthenticated,
    tokenUserInfo,
    loading,
    error,

    login,
    register,
    checkId,
    logout,
    setToken,
  };
};
