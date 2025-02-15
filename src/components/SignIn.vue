<template>
  <div>
    <h1>로그인</h1>
    <button @click="handleSignIn">로그인</button>
    <p>아직 아이디가 없으신가요?</p>
    <router-link to="/signUp">회원가입</router-link>
  </div>
</template>
<script setup lang="ts">
import { router } from "../routers/router";

const handleSignIn = () => {
  router.push("/board");
};
</script>
