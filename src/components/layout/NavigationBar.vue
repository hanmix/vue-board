<template>
  <!-- 데스크톱: 상단 고정 헤더 -->
  <header class="navigation-header">
    <div class="brand-section">
      <h1 class="brand-title">Vue Board</h1>
      <span class="brand-subtitle">싱글벙글 게시판</span>
    </div>

    <nav class="desktop-nav desktop-only">
      <Tabs :tabs="tabs" :current-board="currentBoard" />
    </nav>

    <div class="actions-section">
      <VButton variant="ghost" @click="toggleTheme" class="theme-toggle">
        {{ isDark ? '🌞' : '🌙' }}
      </VButton>
    </div>
  </header>

  <!-- 모바일: 하단 고정 탭 -->
  <nav class="bottom-navigation mobile-only">
    <Tabs :tabs="tabs" :current-board="currentBoard" />
  </nav>
</template>

<script setup lang="ts">
import '/src/assets/styles/components/layout/NavigationBar.css';
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
  // BoardDetail 페이지인 경우
  if (route.name === 'board-detail') {
    // 1순위: 쿼리 파라미터 'from' 사용 (즉시 사용 가능)
    if (route.query.from) {
      const fromBoard = route.query.from as string;
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

      return mappedTab;
    }
  }

  // 다른 페이지는 기본 Vue Router 로직 사용
  return null;
});
</script>
