import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const name = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const doubleCheckPassword = ref<string>('');
  const token = ref<string | null>(localStorage.getItem('token'));
  const user = ref<{ email: string; name: string } | null>(null);
  const isAuthenticated = computed(() => !!token.value);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
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

    setToken,
  };
});
