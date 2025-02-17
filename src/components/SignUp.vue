<template>
  <div class="container">
    <h1>회원가입</h1>
    <input
      id="name"
      class="inputbox"
      type="text"
      placeholder="이름을 입력해주세요."
      required
    />
    <input
      id="email"
      class="inputbox"
      type="text"
      placeholder="아이디를 입력해주세요."
      required
    />
    <input
      id="password"
      class="inputbox"
      type="password"
      placeholder="비밀번호 입력해주세요."
      required
    />
    <button id="submit" @click="handleSignUp">회원가입 하기</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleSignUp = () => {
  router.push('signIn');
};
</script>
