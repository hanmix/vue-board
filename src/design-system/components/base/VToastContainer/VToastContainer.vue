<template>
  <div class="v-toast-container">
    <VAlert
      v-for="toast in toasts"
      :key="toast.id"
      :visible="toast.visible"
      :variant="toast.variant"
      :title="toast.title"
      :message="toast.message"
      :duration="toast.duration"
      :closable="toast.closable"
      position="top-right"
      @close="handleToastClose(toast.id)"
      @update:visible="handleVisibilityUpdate(toast.id, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import '/src/assets/styles/components/design-system/base/VToastContainer.css';
import { VAlert } from '../VAlert';
import { useToast } from '@/design-system/composables/useToast';

const { toasts, removeToast } = useToast();

const handleToastClose = (id: string) => {
  removeToast(id);
};

const handleVisibilityUpdate = (id: string, visible: boolean) => {
  if (!visible) {
    removeToast(id);
  }
};
</script>

