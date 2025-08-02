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
  flex-direction: column; /* 👉 요소를 세로로 나열 */
  justify-content: center; /* 👉 세로축에서 가운데 정렬 */
  align-items: center; /* 👉 가로축에서 가운데 정렬 */
  height: 100vh;
}
</style>
