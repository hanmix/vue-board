<template>
  <!-- 데스크톱: 헤더 내 탭 -->
  <header class="header">
    <div class="header-mobile">
      <h1>싱글벙글 게시판</h1>
      <div class="nav-buttons desktop-only">
        <Tabs :tabs="tabs" :current-board="currentBoard" />
      </div>
    </div>
  </header>
  
  <!-- 모바일: 하단 고정 탭 -->
  <nav class="bottom-navigation mobile-only">
    <Tabs :tabs="tabs" :current-board="currentBoard" />
  </nav>
</template>

<script setup lang="ts">
import type { TabInfo } from '@/types/tab';
import { TabName } from '@/types/tab';
import { BoardType } from '@/types/pagination';
import { Tabs } from '@/components/ui/navigation';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '@/stores/post';

const route = useRoute();
const { currentPost } = usePostStore();

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
