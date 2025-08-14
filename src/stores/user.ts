import type { User } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const allUsers = ref<User[]>([]);
  const currentUser = ref<User>();
  const userId = ref<string | null>(sessionStorage.getItem('userId'));
  const loading = ref<boolean>(false);
  const error = ref<string | null>('');

  return {
    allUsers,
    currentUser,
    userId,
    loading,
    error,
  };
});
