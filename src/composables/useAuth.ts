import { ref } from 'vue';

export const useAuth = () => {
  const name = ref('');
  const email = ref('');
  const password = ref('');

  return {
    name,
    email,
    password,
  };
};
