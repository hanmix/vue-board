<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { NavigationBar } from '@/components/layout';
import { useTheme } from '@/design-system/composables/useTheme';

const route = useRoute();
const { initTheme } = useTheme();

// Navigation을 보여줄 페이지들 정의
const shouldShowNavigation = computed(() => {
  return route.path.startsWith('/board') || route.path === '/mypage';
});

// 앱 시작 시 테마 초기화
onMounted(() => {
  initTheme();
});
</script>

<template>
  <div id="app-root">
    <!-- Navigation -->
    <NavigationBar v-if="shouldShowNavigation" />
    
    <!-- Main Content -->
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style>
/* 글로벌 앱 스타일 - 새로운 디자인 시스템 기반 */
#app-root {
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text);
}

.app-main {
  /* 네비게이션이 있을 때와 없을 때 모두 고려한 유연한 레이아웃 */
  min-height: 100vh;
  position: relative;
}

/* 네비게이션이 있는 페이지에서의 메인 콘텐츠 조정 */
.app-main:has(~ nav) {
  /* 필요시 네비게이션 높이만큼 padding-top 추가 가능 */
}
</style>
