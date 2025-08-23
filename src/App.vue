<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { NavigationBar } from '@/components/layout';

const route = useRoute();

// Navigation을 보여줄 페이지들 정의
const shouldShowNavigation = computed(() => {
  return route.path.startsWith('/board') || route.path === '/mypage';
});
</script>

<template>
  <!-- Navigation을 App 컴포넌트 내부로 이동 (이미 #app에 마운트됨) -->
  <NavigationBar v-if="shouldShowNavigation" />
  
  <!-- Vue transition 제거하여 sticky positioning 안정성 확보 -->
  <router-view />
</template>
