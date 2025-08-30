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
      <VButton
        v-if="route.name !== 'mypage'"
        variant="ghost"
        :size="isMobile ? 'sm' : 'md'"
        @click="toggleSearchBar"
      >
        <VIcon :name="'search'" :size="isMobile ? 'sm' : 'md'" />
      </VButton>

      <SettingButton />
    </div>
  </header>

  <!-- Search Header -->
  <Transition name="slide-down">
    <VCard
      v-if="isSearchVisible"
      variant="outlined"
      padding="sm"
      class="search-section"
    >
      <SearchFilter
        :boardType="boardType"
        :searchKeyword="searchKeyword"
        :searchType="searchType"
        :onSearch="setSearch"
      />
    </VCard>
  </Transition>

  <!-- 모바일: 하단 고정 탭 -->
  <nav class="bottom-navigation mobile-only">
    <Tabs :tabs="tabs" :current-board="currentBoard" />
  </nav>
</template>

<script setup lang="ts">
import './NavigationBar.css';
import { type TabInfo, TabName } from '@/types/tab';
import { BoardType } from '@/types/navigate';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '@/stores/post';
import { VButton, VIcon, VCard } from '@/design-system/components';
import { Tabs, SearchFilter } from '@/components/ui';
import { useBoardData, useBreakpoint, useNavigation } from '@/composables';
import SettingButton from './SettingButton.vue';

const route = useRoute();
const { currentPost } = usePostStore();
const { searchKeyword, searchType, setSearch } = useBoardData(BoardType.ALL);
const { isMobile } = useBreakpoint();
const { isSearchVisible, toggleSearchBar } = useNavigation();

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
];

const boardType = computed(() => {
  const path = route.path;
  if (path.startsWith('/board/notice')) {
    return BoardType.NOTICE;
  } else if (path.startsWith('/board/free')) {
    return BoardType.FREE;
  } else {
    return BoardType.ALL; // 기본값 또는 기타 게시판 타입
  }
});

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
