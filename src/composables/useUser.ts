import { getUserByIdApi, getUsersApi } from '@/apis';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

export const useUser = () => {
  const userStore = useUserStore();
  const { allUsers, currentUser, userId, loading, error } =
    storeToRefs(userStore);

  const userIds = computed(() => allUsers.value.map(user => user.id));

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
    userIds,
    userId,

    getAllUsers,
    getUserById,
  };
};
