<template>
  <div>
    <h1>회원가입</h1>
    <button @click="handleSignUp">회원가입 하기</button>
  </div>
</template>

<script setup lang="ts">
import { router } from "../routers/router";

const handleSignUp = () => {
  router.push("signIn");
};
</script>
