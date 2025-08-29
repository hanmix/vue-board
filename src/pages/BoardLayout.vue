<template>
  <main class="board-layout">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import './BoardLayout.css';
// NavigationBar는 이제 App.vue에서 관리
// 여기서는 게시판 콘텐츠 영역만 처리
</script>
