<script setup lang="ts"></script>

<template>
  <div class="main">
    <p>Main Page 입니다.</p>

    <router-link to="/signIn">로그인하러 가기</router-link>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center; /* 수평 가운데 */
  align-items: center; /* 수직 가운데 */
  height: 100vh;
}
</style>
