<template>
  <div class="board-container">
    <router-view :key="$route.fullPath" />
  </div>
</template>
<script setup lang="ts"></script>
