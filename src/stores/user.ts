import { defineStore } from 'pinia';
import type { User } from '../types/user';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from '../apis/user';
import { login } from '@/apis/auth';
import { ref, computed } from 'vue';
import type { DecodedToken } from '@/types';

export const useUserStore = defineStore('user', () => {
  const users = ref([] as User[]);
  const currentUser = ref(null as User | null);
  const token = ref(null as string | null);

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

      token.value = accessToken;
      currentUser.value = user;
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return {
    // state
    users,
    currentUser,
    token,

    // getters
    isLoggedIn,

    // actions
    signIn,
  };
});
