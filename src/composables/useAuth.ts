import { computed, ref } from 'vue';

export const useAuth = () => {
  const name = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const doubleCheckPassword = ref<string>('');

  const isCheckEmptyName = computed<boolean>(() => name.value.trim() === '');
  const isCheckEmptyEmail = computed<boolean>(() => email.value.trim() === '');
  const isCheckEmptyPassword = computed<boolean>(
    () => password.value.trim() === ''
  );
  const isPasswordMatch = computed<boolean>(
    () => password.value !== doubleCheckPassword.value
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
