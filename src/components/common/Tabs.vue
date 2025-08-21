<template>
  <div class="tabs">
    <router-link
      v-for="tab in tabs"
      :key="tab.id"
      :to="tab.to"
      class="tab"
      active-class="active"
      @click="handleTabClick"
    >
      {{ tab.label }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { TabInfo } from '@/types/tab';
import { usePostStore } from '@/stores/post';

const { tabs } = defineProps<{ tabs: TabInfo[] }>();
const postStore = usePostStore();

const handleTabClick = () => {
  postStore.resetPagination();
};
</script>
