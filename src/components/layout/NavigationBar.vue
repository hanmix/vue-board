<template>
  <header class="header">
    <div class="header-mobile">
      <h1>싱글벙글 게시판</h1>
      <div class="nav-buttons">
        <Tabs :tabs="tabs" v-model="selected" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { TabInfo } from '@/types/tab';
import { TabName } from '@/types/tab';
import { Tabs } from '@/components/ui/navigation';
import { ref } from 'vue';

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

const selected = ref(tabs[1].id);
</script>
