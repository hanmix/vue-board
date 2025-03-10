import { computed } from 'vue';
import { useUser } from '@/composables';

export const useAuth = () => {
  const { name, email, password, doubleCheckPassword } = useUser();

  const isCheckEmptyName = computed<boolean>(() => name.value.trim() === '');
  const isCheckEmptyEmail = computed<boolean>(() => email.value.trim() === '');
  const isCheckEmptyPassword = computed<boolean>(
    () => password.value.trim() === ''
  );
  const isPasswordMatch = computed<boolean>(
    () => password !== doubleCheckPassword
  );

  return {
    name,
    email,
    password,
    doubleCheckPassword,
    isCheckEmptyName,
    isCheckEmptyEmail,
    isCheckEmptyPassword,
    isPasswordMatch,
  };
};
