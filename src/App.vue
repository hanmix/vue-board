<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { NavigationBar } from '@/components/layout';
import { useTheme } from '@/design-system/composables/useTheme';
import { VToastContainer } from '@/design-system/components/base';

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
    <!-- Sticky Navigation Header -->
    <header v-if="shouldShowNavigation" class="app-header">
      <NavigationBar />
    </header>
    
    <!-- Main Content -->
    <main class="app-main" :class="{ 'with-navigation': shouldShowNavigation }">
      <router-view />
    </main>
    
    <!-- Toast Container -->
    <VToastContainer />
  </div>
</template>

<style>
/* 글로벌 앱 스타일 - 새로운 디자인 시스템 기반 */
#app-root {
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text);
}

/* Sticky Navigation Header */
.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--color-bg);
}

.app-main {
  min-height: 100vh;
  position: relative;
}

/* 네비게이션이 있는 페이지에서의 메인 콘텐츠 */
.app-main.with-navigation {
  /* sticky header가 처리하므로 별도 padding-top 불필요 */
  min-height: calc(100vh - var(--nav-height, 64px));
}
</style>
