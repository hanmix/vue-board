import { computed } from 'vue';
import { useAuthStore } from '@/stores';
import { useUser } from '@/composables';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import type { LoginRequest, RegisterRequest } from '@/types';
import { checkIdApi, loginApi, registerApi } from '@/apis';

export const useAuth = () => {
  const authStore = useAuthStore();
  const { setUserInfo } = useUser();

  const isEmptyName = computed<boolean>(() => name.value.trim() === '');
  const isEmptyEmail = computed<boolean>(() => email.value.trim() === '');
  const isEmptyPassword = computed<boolean>(() => password.value.trim() === '');
  const isEmptyDoubleCheckPassword = computed<boolean>(
    () => doubleCheckPassword.value.trim() === ''
  );
  const isPasswordMatch = computed<boolean>(
    () => password !== doubleCheckPassword
  );

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
  } = storeToRefs(authStore);
  const { setToken } = authStore;

  const router = useRouter();

  const login = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const payload: LoginRequest = { email, password };
      const { isSuccess, message, data } = await loginApi(payload);
      if (!isSuccess) throw (error.value = message || '로그인에 실패했습니다.');

      setToken(data.token);
      setUserInfo(data.user.id);
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
    isEmptyName,
    isEmptyEmail,
    isEmptyPassword,
    isEmptyDoubleCheckPassword,
    isPasswordMatch,
    token,
    isAuthenticated,
    user,
    loading,
    error,

    login,
    register,
    checkId,
    logout,
    setToken,
  };
};
