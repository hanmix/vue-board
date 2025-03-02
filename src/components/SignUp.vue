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
    <div>
      <input
        id="email"
        class="inputbox"
        type="text"
        placeholder="이메일을 입력해주세요."
        v-model="email"
      />
      <button @click="checkedEmail">이메일 중복확인</button>
    </div>
    <input
      id="password"
      class="inputbox"
      type="password"
      placeholder="비밀번호 입력해주세요."
      v-model="password"
    />
    <input
      id="doublePassword"
      class="inputbox"
      type="password"
      placeholder="비밀번호 다시 입력해주세요."
      v-model="doubleCheckPassword"
    />
    <button id="submit" @click="handleSignUp">회원가입 하기</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';
import { useModal, useAuth } from '@/composables';

const router = useRouter();
const userStore = useUserStore();
const { showAlert } = useModal();
const {
  name,
  email,
  password,
  doubleCheckPassword,
  isCheckEmptyName,
  isCheckEmptyEmail,
  isCheckEmptyPassword,
  isPasswordMatch,
} = useAuth();

const checkedEmail = async () => {
  if (isCheckEmptyEmail.value) {
    showAlert('이메일을 입력해주세요.');
    return;
  }

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
    case isCheckEmptyName.value:
      showAlert('이름을 입력해주세요.');
      return;
    case isCheckEmptyEmail.value:
      showAlert('이메일을 입력해주세요.');
      return;
    case isCheckEmptyPassword.value:
      showAlert('비밀번호를 입력해주세요.');
      return;
    case isPasswordMatch.value:
      showAlert('비밀번호를 다시 확인해주세요.');
      return;
  }

  try {
    await userStore.register(name.value, email.value, password.value);
    if (userStore.isAuthenticated) {
      showAlert('회원가입이 완료되었습니다.');
      router.push('/signIn');
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
  }
};
</script>
