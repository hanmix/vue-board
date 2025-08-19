<template>
  <header class="header">
    <h1>싱글벙글 게시판</h1>
    <div class="nav-buttons">
      <Tabs :tabs="tabs" v-model="selected" />
      <button v-if="route.name === 'mypage'" @click="handleLogout">
        로그아웃
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables';
import { TabInfo, TabName } from '@/types/tab';
import { useRouter, useRoute } from 'vue-router';
import Tabs from './common/Tabs.vue';
import { ref } from 'vue';

const { logout } = useAuth();
const router = useRouter();
const route = useRoute();

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

function handleLogout() {
  const confirmed = confirm('정말 로그아웃 하시겠습니까?');
  if (!confirmed) return;
  logout();
  router.push('/signIn');
}
</script>

<style scoped></style>
