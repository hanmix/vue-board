import { useUserStore } from '@/stores';

export const useUser = () => {
  const userStore = useUserStore();
  const { logout } = userStore;

  return { logout };
};
