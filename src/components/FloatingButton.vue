<template>
  <div class="floating-container">
    <button
      v-if="route.name === 'free'"
      @click="showModal"
      class="floating-button"
    >
      ✍️
    </button>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/composables';
import { useRoute } from 'vue-router';
const { showModal } = useModal();
const route = useRoute();
</script>
