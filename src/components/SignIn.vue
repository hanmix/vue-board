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
import { router } from "@routers/router";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const email = ref("");
const password = ref("");
const userStore = useUserStore();

const handleSignIn = async () => {
  try {
    await userStore.login(email.value, password.value);
    if (userStore.currentUser) {
      router.push("/board");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert("로그인 중 오류가 발생했습니다.");
  }
};
</script>
