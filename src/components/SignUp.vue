<template>
  <div class="container">
    <h1>회원가입</h1>
    <input
      id="name"
      class="inputbox"
      type="text"
      placeholder="이름을 입력해주세요."
      v-model="name"
    />
    <input
      id="email"
      class="inputbox"
      type="text"
      placeholder="아이디를 입력해주세요."
      v-model="email"
    />
    <input
      id="password"
      class="inputbox"
      type="password"
      placeholder="비밀번호 입력해주세요."
      v-model="password"
    />
    <button id="submit" @click="handleSignUp">회원가입 하기</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useModal } from '@/composables/useModal';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const userStore = useUserStore();
const { showAlert } = useModal();
const { name, email, password } = useAuth();

const handleSignUp = async () => {
  if (name.value.trim() === '') {
    showAlert('이름을 입력해주세요.');
    return;
  }
  if (email.value.trim() === '') {
    showAlert('아이디를 입력해주세요.');
    return;
  }

  if (password.value.trim() === '') {
    showAlert('비밀번호를 입력해주세요.');
    return;
  }
  try {
    await userStore.signUp(name.value, email.value, password.value);
    if (userStore.currentUser) {
      showAlert('회원가입이 완료되었습니다.');
      router.push('/signIn');
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
  }
};
</script>
