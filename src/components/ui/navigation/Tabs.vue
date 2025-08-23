<template>
  <div class="tabs">
    <router-link
      v-for="tab in tabs"
      :key="tab.id"
      :to="tab.to"
      :class="getTabClass(tab).value"
    >
      {{ tab.label }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { TabInfo } from '@/types/tab';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{ 
  tabs: TabInfo[]
  currentBoard?: string | null
}>();

const route = useRoute();

// 탭별 active 상태 판단 - 수정된 로직
const getTabClass = (tab: TabInfo) => {
  return computed(() => {
    let isActive = false;
    
    console.log(`🏷️  Tabs getTabClass for ${tab.label}:`, {
      tabId: tab.id,
      tabTo: tab.to,
      currentBoard: props.currentBoard,
      routePath: route.path,
      routeName: route.name
    });
    
    // BoardDetail 페이지 처리
    if (route.name === 'board-detail') {
      if (props.currentBoard !== null && props.currentBoard !== undefined) {
        // currentPost 로드 후: board 값으로 판단
        isActive = tab.id === props.currentBoard;
        console.log(`📋 BoardDetail (로드완료) - ${tab.label}: ${isActive ? '활성' : '비활성'} (${tab.id} === ${props.currentBoard})`);
      } else {
        // currentPost 로드 전: 이전 경로에서 유추 (임시)
        const referrer = document.referrer;
        if (referrer.includes('/board/notice') && tab.id === 'notice') {
          isActive = true;
        } else if (referrer.includes('/board/free') && tab.id === 'free') {
          isActive = true;
        }
        console.log(`⏳ BoardDetail (로드중) - ${tab.label}: ${isActive ? '활성' : '비활성'} (referrer 기반)`);
      }
    } else {
      // 다른 페이지에서는 기본 Vue Router 로직
      const pathMatch = route.path === tab.to;
      const includesMatch = route.path.includes(tab.to.replace('/board/', ''));
      isActive = pathMatch || includesMatch;
      console.log(`🔗 기본 Router 모드 - ${tab.label}: ${isActive ? '활성' : '비활성'} (path: ${pathMatch}, includes: ${includesMatch})`);
    }
    
    return {
      'tab': true,
      'active': isActive
    };
  });
};
</script>