<template>
  <div class="board-layout">
    <VContainer class="board-container">
      <!-- Board Content Area -->
      <main class="board-content">
        <router-view />
      </main>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
// NavigationBar는 이제 App.vue에서 관리
// 여기서는 게시판 콘텐츠 영역만 처리
</script>

<style scoped>
.board-layout {
  min-height: 100vh;
  background-color: var(--color-bg);
}

.board-container {
  /* NavigationBar 높이를 고려한 상단 여백 */
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
}

.board-content {
  /* 게시판 콘텐츠 영역 */
  min-height: calc(100vh - var(--space-16));
  position: relative;
}

/* 모바일에서 하단 네비게이션 고려 */
@media (max-width: 768px) {
  .board-container {
    padding-top: var(--space-6);
    /* 하단 네비게이션 높이 고려한 여백 */
    padding-bottom: calc(80px + var(--safe-area-inset-bottom) + var(--space-6));
  }

  .board-content {
    min-height: auto;
  }
}

/* iPhone SE 및 작은 화면 최적화 */
@media (max-width: 375px) {
  .board-container {
    padding-top: var(--space-4);
    padding-bottom: calc(80px + var(--safe-area-inset-bottom) + var(--space-4));
  }
}
</style>
