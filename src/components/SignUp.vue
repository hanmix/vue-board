<template>
  <div class="login-container">
    <h1>회원가입</h1>
    <form @submit.prevent="handleSignUp">
      <div class="form-group">
        <div style="padding: 10px">
          <label for="name">이름</label>
          <input
            id="name"
            class="inputbox"
            type="text"
            placeholder="이름을 입력해주세요."
            v-model="name"
          />
        </div>
        <div style="padding: 10px">
          <label for="email">이메일</label>
          <div style="display: flex; gap: 10px">
            <input
              id="email"
              class="inputbox"
              type="text"
              placeholder="이메일을 입력해주세요."
              v-model="email"
            />
            <button @click="checkedEmail">이메일 중복확인</button>
          </div>
        </div>
        <div style="padding: 10px">
          <label for="password">비밀번호</label>
          <input
            id="password"
            class="inputbox"
            type="password"
            placeholder="비밀번호 입력해주세요."
            v-model="password"
          />
        </div>
        <div style="padding: 10px">
          <label for="doublePassword">비밀번호 확인</label>
          <input
            id="doublePassword"
            class="inputbox"
            type="password"
            placeholder="비밀번호 다시 입력해주세요."
            v-model="doubleCheckPassword"
          />
        </div>
        <div style="padding: 10px">
          <button type="submit">회원가입 하기</button>
        </div>
      </div>
    </form>
    <div
      style="display: flex; align-items: center; gap: 10px; padding-top: 20px"
    >
      <p>이미 아이디가 있으신가요?</p>
      <router-link to="/signIn">로그인</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useModal, useAuth } from '@/composables';

const router = useRouter();
const { showAlert } = useModal();
const {
  name,
  email,
  password,
  doubleCheckPassword,
  isEmptyName,
  isEmptyEmail,
  isEmptyPassword,
  isEmptyDoubleCheckPassword,
  isPasswordMatch,
  isAuthenticated,
} = useAuth();
const { register } = useAuth();

// TODO: 이메일 중복 확인 API 수정 시 삭제
const checkedEmail = async () => {
  if (isEmptyEmail.value) return;

  // try {
  //   await userStore.emailChecker(email.value);
  //   if (userStore.isAvailableId) {
  //     showAlert('사용 가능한 이메일 입니다.');
  //   } else {
  //     showAlert('이미 사용중인 이메일 입니다.');
  //   }
  // } catch (error) {
  //   console.error('Error during id-check:', error);
  // }
};

const handleSignUp = async () => {
  switch (true) {
    case isEmptyName.value:
      showAlert('이름을 입력해주세요.');
      return;
    case isEmptyEmail.value:
      showAlert('이메일을 입력해주세요.');
      return;
    case isEmptyPassword.value:
      showAlert('비밀번호를 입력해주세요.');
      return;
    case isEmptyDoubleCheckPassword.value:
      showAlert('비밀번호를 다시 확인해주세요.');
      return;
  }

  try {
    await register(email.value, password.value, name.value);
    if (isAuthenticated) {
      showAlert('회원가입이 완료되었습니다.');
      router.push('/signIn');
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
  }
};
</script>
