import type { User } from '@/types';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getUserByIdApi, getUsersApi } from '@/apis';
import { useAuthStore } from './auth';

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore();
  const allUsers = ref<User[]>([]);
  const currentUser = ref<User>();
  const loading = ref<boolean>(false);
  const error = ref<string | null>('');

  const userId = computed(() => authStore.getCurrentUserId());

  const getAllUsers = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const { data, isSuccess } = await getUsersApi();
      if (!isSuccess)
        throw (error.value = '유저 정보를 불러오는데 실패했습니다.');

      allUsers.value = data;
      console.log('users', data);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const getUserById = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const { data, isSuccess } = await getUserByIdApi(userId.value ?? '');

      if (!isSuccess)
        throw (error.value = '유저 정보를 불러오는데 실패했습니다.');

      currentUser.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    allUsers,
    currentUser,
    userId,
    loading,
    error,

    getAllUsers,
    getUserById,
  };
});
