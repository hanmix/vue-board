<template>
  <div class="navigation-wrapper">
    <!-- 데스크톱: 상단 고정 헤더 -->
    <VContainer class="navigation-container">
      <header class="navigation-header">
        <div class="header-content">
          <div class="brand-section">
            <h1 class="brand-title">Vue Board</h1>
            <span class="brand-subtitle">싱글벙글 게시판</span>
          </div>
          
          <div class="nav-section desktop-only">
            <Tabs :tabs="tabs" :current-board="currentBoard" />
          </div>
          
          <div class="actions-section">
            <VButton variant="ghost" @click="toggleTheme" class="theme-toggle">
              {{ isDark ? '🌞' : '🌙' }}
            </VButton>
          </div>
        </div>
      </header>
    </VContainer>
    
    <!-- 모바일: 하단 고정 탭 -->
    <nav class="bottom-navigation mobile-only">
      <VContainer padding="tight">
        <div class="bottom-nav-content">
          <Tabs :tabs="tabs" :current-board="currentBoard" />
        </div>
      </VContainer>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { TabInfo } from '@/types/tab';
import { TabName } from '@/types/tab';
import { BoardType } from '@/types/pagination';
import { Tabs } from '@/components/ui/navigation';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '@/stores/post';
import { useTheme } from '@/design-system/composables/useTheme';

const route = useRoute();
const { currentPost } = usePostStore();
const { toggleTheme, isDark } = useTheme();

const tabs: TabInfo[] = [
  {
    id: TabName.NOTICE,
    label: '공지게시판',
    to: `/board/${TabName.NOTICE}`,
  },
  {
    id: TabName.FREE,
    label: '자유게시판',
    to: `/board/${TabName.FREE}`,
  },
  {
    id: TabName.MY,
    label: '마이페이지',
    to: '/mypage',
  },
];

// BoardDetail에서 현재 게시글이 속한 게시판 판단
const currentBoard = computed(() => {
  console.log('🔍 NavigationBar currentBoard 계산:', {
    routeName: route.name,
    routePath: route.path,
    routeQuery: route.query,
    currentPostExists: !!currentPost,
    currentPostBoard: currentPost?.board,
    currentPostId: currentPost?.id
  });
  
  // BoardDetail 페이지인 경우
  if (route.name === 'board-detail') {
    // 1순위: 쿼리 파라미터 'from' 사용 (즉시 사용 가능)
    if (route.query.from) {
      const fromBoard = route.query.from as string;
      console.log('✅ BoardDetail에서 쿼리 파라미터 사용:', fromBoard);
      return fromBoard;
    }
    
    // 2순위: currentPost.board 사용 (API 로드 후)
    if (currentPost?.board) {
      const boardValue = currentPost.board;
      let mappedTab: string | null = null;
      
      // BoardType enum 값과 일치하는지 확인
      if (boardValue === BoardType.NOTICE) {
        mappedTab = TabName.NOTICE;
      } else if (boardValue === BoardType.FREE) {
        mappedTab = TabName.FREE;
      }
      
      console.log('✅ BoardDetail에서 currentPost.board 사용:', {
        originalBoard: currentPost.board,
        mappedTab: mappedTab
      });
      
      return mappedTab;
    }
  }
  
  // 다른 페이지는 기본 Vue Router 로직 사용
  console.log('🔄 기본 Vue Router 로직 사용 (currentBoard = null)');
  return null;
});

</script>

<style scoped>
/* Navigation Wrapper */
.navigation-wrapper {
  position: relative;
  z-index: var(--z-sticky); /* 새로운 디자인 시스템의 z-index 체계 사용 */
}

/* Desktop Header */
.navigation-container {
  position: sticky;
  top: 0;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: var(--shadow-sm);
}

.navigation-header {
  padding: var(--space-4) 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

/* Brand Section */
.brand-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.brand-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
  line-height: var(--line-height-tight);
}

.brand-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
}

/* Navigation Section */
.nav-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* Actions Section */
.actions-section {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.theme-toggle {
  font-size: var(--font-size-lg);
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
}

/* Bottom Navigation (Mobile) */
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-sticky);
}

.bottom-nav-content {
  padding: var(--space-2) 0;
  padding-bottom: max(var(--space-2), var(--safe-area-inset-bottom));
}

/* Responsive Design */
.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  .brand-section {
    flex-direction: row;
    align-items: center;
    gap: var(--space-3);
  }

  .brand-subtitle::before {
    content: '·';
    margin-right: var(--space-1);
    color: var(--color-text-muted);
  }

  /* 모바일에서 하단 네비게이션을 위한 여백 확보 */
  .navigation-wrapper {
    margin-bottom: calc(60px + var(--safe-area-inset-bottom));
  }
}

/* iPhone SE 및 작은 화면 최적화 */
@media (max-width: 375px) {
  .navigation-header {
    padding: var(--space-3) 0;
  }

  .brand-title {
    font-size: var(--font-size-lg);
  }

  .brand-subtitle {
    font-size: var(--font-size-xs);
  }

  .header-content {
    gap: var(--space-2);
  }
}

/* Dark mode optimizations */
@media (prefers-color-scheme: dark) {
  .navigation-container,
  .bottom-navigation {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .navigation-container {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
