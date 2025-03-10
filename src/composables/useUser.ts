import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

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
  } = storeToRefs(userStore);
  const { login, register, checkId, logout } = userStore;

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
