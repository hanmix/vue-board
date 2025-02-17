<template>
  <div class="container">
    <h1>로그인</h1>
    <input
      id="email"
      class="inputbox"
      type="text"
      placeholder="아이디를 입력해주세요."
      v-model="email"
      required
    />
    <input
      id="password"
      class="inputbox"
      type="password"
      placeholder="비밀번호 입력해주세요."
      v-model="password"
      required
    />
    <button id="submit" @click="handleSignIn">로그인</button>
    <div>
      <p>아직 아이디가 없으신가요?</p>
      <router-link to="/signUp">회원가입</router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useModal } from '@/composables/useModal';
import { useAuth } from '@/composables/useAuth';

const userStore = useUserStore();
const router = useRouter();
const { showAlert } = useModal();
const { email, password } = useAuth();

const handleSignIn = async () => {
  try {
    await userStore.signIn(email.value, password.value);
    if (userStore.currentUser) {
      showAlert('로그인 되었습니다.');
      router.push('/board');
    } else {
      showAlert('아이디 또는 비밀번호가 틀렸습니다.');
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    showAlert('로그인 중 오류가 발생했습니다.');
  }
};
</script>
