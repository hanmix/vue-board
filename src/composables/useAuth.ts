import { computed } from 'vue';
import { useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

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

  const { login, register, checkId, logout, getCurrentUser, getCurrentUserId } =
    authStore;

  const isEmptyName = computed<boolean>(() => name.value.trim() === '');
  const isEmptyEmail = computed<boolean>(() => email.value.trim() === '');
  const isEmptyPassword = computed<boolean>(() => password.value.trim() === '');
  const isEmptyDoubleCheckPassword = computed<boolean>(
    () => doubleCheckPassword.value.trim() === ''
  );
  const isPasswordMatch = computed<boolean>(
    () => password !== doubleCheckPassword
  );

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
    getCurrentUser,
    getCurrentUserId,
  };
};
