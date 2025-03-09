<template>
  <div class="login-container">
    <h1>로그인</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">이메일</label>
        <input id="email" type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="userStore.loading">로그인</button>
      <p v-if="userStore.error" class="error">{{ userStore.error }}</p>
    </form>
    <div>
      <p>아직 아이디가 없으신가요?</p>
      <router-link to="/signUp">회원가입</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';
import { useModal } from '@/composables';

const { showAlert } = useModal();

const email = ref('');
const password = ref('');

const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value);
    if (userStore.isAuthenticated) {
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

<style scoped>
.login-container {
  margin: 2rem auto;
  padding: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #95a5a6;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
