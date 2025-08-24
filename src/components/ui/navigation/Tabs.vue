<template>
  <nav class="tabs" role="tablist" aria-label="네비게이션 탭">
    <router-link
      v-for="tab in tabs"
      :key="tab.id"
      :to="tab.to"
      :class="getTabClass(tab).value"
      :aria-current="getTabClass(tab).value.active ? 'page' : undefined"
      role="tab"
      :aria-selected="getTabClass(tab).value.active"
    >
      {{ tab.label }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import '/src/assets/styles/components/ui/navigation/Tabs.css';
import type { TabInfo } from '@/types/tab';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  tabs: TabInfo[];
  currentBoard?: string | null;
}>();

const route = useRoute();

const getTabClass = (tab: TabInfo) => {
  return computed(() => {
    let isActive = false;

    if (route.name === 'board-detail') {
      if (props.currentBoard !== null && props.currentBoard !== undefined) {
        isActive = tab.id === props.currentBoard;
      } else {
        const referrer = document.referrer;
        if (referrer.includes('/board/notice') && tab.id === 'notice') {
          isActive = true;
        } else if (referrer.includes('/board/free') && tab.id === 'free') {
          isActive = true;
        }
      }
    } else {
      const pathMatch = route.path === tab.to;
      const includesMatch = route.path.includes(tab.to.replace('/board/', ''));
      isActive = pathMatch || includesMatch;
    }

    return {
      tab: true,
      active: isActive,
    };
  });
};
</script>
