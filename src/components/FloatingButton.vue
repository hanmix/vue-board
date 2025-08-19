<template>
  <div class="floating-container">
    <button
      v-if="route.name === 'free'"
      @click="setIsModalOpen(true)"
      class="floating-button"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/composables';
import { useRoute } from 'vue-router';
const { setIsModalOpen } = useModal();
const route = useRoute();
</script>
