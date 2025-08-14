import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { JwtPayload } from '@/utils';

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

  const setToken = (newToken: string) => {
    sessionStorage.setItem('access-token', newToken);
  };

  const setUserInfo = (userInfo: string) => {
    sessionStorage.setItem('userId', userInfo);
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

    setToken,
    setUserInfo,
  };
});
