<template>
  <div class="container">
    <h1>로그인</h1>
    <input
      id="email"
      class="inputbox"
      type="text"
      placeholder="아이디를 입력해주세요."
      :ref="email"
      required
    />
    <input
      id="password"
      class="inputbox"
      type="password"
      placeholder="비밀번호 입력해주세요."
      :ref="password"
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

const email = ref("");
const password = ref("");

const handleSignIn = () => {
  router.push("/board");
};
</script>
