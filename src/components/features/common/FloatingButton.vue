<template>
  <div class="floating-container">
    <button
      v-if="route.name === 'free'"
      @click="showModal"
      class="floating-button"
      aria-label="새 글 작성"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M14.5 4.5L19.5 9.5L7 22H2V17L14.5 4.5Z"/>
        <path d="M13 5.5L18 10.5"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/composables';
import { useRoute } from 'vue-router';
const { showModal } = useModal();
const route = useRoute();
</script>
