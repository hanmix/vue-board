<script setup lang="ts">
// 간단한 페이지 전환을 위한 setup
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition
      name="page-fade"
      mode="out-in"
      appear
    >
      <component 
        :is="Component" 
        :key="route.path"
      />
    </transition>
  </router-view>
</template>
