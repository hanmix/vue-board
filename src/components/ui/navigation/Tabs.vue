<template>
  <div class="tabs">
    <router-link
      v-for="tab in tabs"
      :key="tab.id"
      :to="tab.to"
      class="tab"
      active-class="active"
    >
      {{ tab.label }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import type { TabInfo } from '@/types/tab';

const { tabs } = defineProps<{ tabs: TabInfo[] }>();
</script>
