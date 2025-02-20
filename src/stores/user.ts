import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { login, register, getUserById, checkId } from '@/apis';
import { ref, computed } from 'vue';
import type { DecodedToken, User } from '@/types';

export const useUserStore = defineStore('user', () => {
  const users = ref([] as User[]);
  const currentUser = ref(null as User | null);
  const token = ref(null as string | null);
  const isAvailableId = ref<boolean>(true);

  const isLoggedIn = computed(() => !!token.value);

  const signIn = async (email: string, password: string) => {
    try {
      const {
        isSuccess,
        data: { token: accessToken },
      } = await login(email, password);
      if (!isSuccess) throw new Error('Login failed');

      const { id: userId } = jwtDecode<DecodedToken>(accessToken);
      const { data: user } = await getUserById(userId, accessToken);
      if (!user) throw new Error('User not found');

      localStorage.setItem('token', accessToken);
      token.value = accessToken;
      currentUser.value = user;
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const {
        isSuccess,
        data: { token: accessToken },
      } = await register(email, password, name);
      if (!isSuccess) throw new Error('Register failed');

      const { id: userId } = jwtDecode<DecodedToken>(accessToken);
      const { data: user } = await getUserById(userId, accessToken);
      if (!user) throw new Error('User not found');

      token.value = accessToken;
      currentUser.value = user;
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  const emailChecker = async (id: string) => {
    try {
      const {
        isSuccess,
        data: { isUserExist },
      } = await checkId(id);
      if (!isSuccess) throw new Error('Check id failed');

      isAvailableId.value = !isUserExist;
    } catch (error) {
      console.error('Check id failed', error);
    }
  };

  return {
    // state
    users,
    currentUser,
    token,
    isAvailableId,

    // getters
    isLoggedIn,

    // actions
    signIn,
    signUp,
    emailChecker,
  };
});
