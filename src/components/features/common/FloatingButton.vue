<template>
  <div class="floating-container">
    <VButton
      v-if="route.name === 'free'"
      variant="primary"
      @click="showModal"
      class="floating-button"
      :aria-label="'새 글 작성'"
    >
      <VIcon name="pencil" size="lg" />
    </VButton>
  </div>
</template>

<script setup lang="ts">
import '/src/assets/styles/components/features/common/FloatingButton.css';
import { VButton, VIcon } from '@/design-system/components';
import { useModal } from '@/composables';
import { useRoute } from 'vue-router';

const { showModal } = useModal();
const route = useRoute();
</script>
