import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

export const useUser = () => {
  const userStore = useUserStore();
  const { allUsers, currentUser, userId, loading, error } =
    storeToRefs(userStore);

  const { getAllUsers, getUserById } = userStore;

  const userIds = computed(() => allUsers.value.map(user => user.id));

  return {
    allUsers,
    currentUser,
    userIds,
    userId,
    loading,
    error,

    getAllUsers,
    getUserById,
  };
};
