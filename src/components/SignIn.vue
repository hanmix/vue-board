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
      <button type="submit" :disabled="loading">로그인</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <div>
      <p>아직 아이디가 없으신가요?</p>
      <router-link to="/signUp">회원가입</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuth, useModal, useUser } from '@/composables';

const router = useRouter();
const { showAlert } = useModal();
const { email, password } = useAuth();
const { loading, error, isAuthenticated, login } = useUser();

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    if (isAuthenticated) {
      showAlert('로그인 되었습니다.');
      router.push('/board');
    } else {
      showAlert('아이디 또는 비밀번호가 틀렸습니다.');
    }
  } catch (error) {
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
