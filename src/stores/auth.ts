import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { LoginRequest, RegisterRequest } from '@/types';
import type { JwtPayload } from '@/utils';
import { checkIdApi, loginApi, registerApi } from '@/apis';
import { parseJwt } from '@/utils';

export const useAuthStore = defineStore('auth', () => {
  const name = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const doubleCheckPassword = ref<string>('');
  const token = ref<string | null>(sessionStorage.getItem('access-token'));
  const tokenUserInfo = ref<JwtPayload | null>(null);
  const isAuthenticated = computed(() => !!token.value);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // 페이지 새로고침 시 토큰에서 사용자 정보 복원
  if (token.value && !tokenUserInfo.value) {
    try {
      tokenUserInfo.value = parseJwt(token.value);
    } catch (err) {
      console.error('토큰 파싱 실패:', err);
      token.value = null;
      sessionStorage.removeItem('access-token');
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const payload: LoginRequest = { email, password };
      const { isSuccess, data } = await loginApi(payload);
      if (!isSuccess) throw error.value;

      token.value = data.token;
      sessionStorage.setItem('access-token', token.value);
      tokenUserInfo.value = parseJwt(token.value);
    } catch {
      error.value = '아이디 또는 비밀번호를 확인해주세요.';
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
  };

  const getCurrentUser = () => {
    if (!tokenUserInfo.value) return null;
    return {
      id: tokenUserInfo.value.id,
    };
  };

  const getCurrentUserId = () => {
    return tokenUserInfo.value?.id || null;
  };

  return {
    name,
    email,
    password,
    doubleCheckPassword,
    token,
    tokenUserInfo,
    isAuthenticated,
    loading,
    error,

    login,
    register,
    checkId,
    logout,
    getCurrentUser,
    getCurrentUserId,
  };
});
