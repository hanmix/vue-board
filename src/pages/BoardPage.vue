<template>
  <div class="board-container">
    <NavigationBar />
    <router-view />
  </div>
</template>
<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
</script>
