import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ModalPayload, ModalType } from '@/types/modal';

export const useModalStore = defineStore('modalStore', () => {
  const type = ref<ModalType | null>(null);
  const payload = ref<ModalPayload>({});
  const isVisible = ref(false);

  return {
    type,
    payload,
    isVisible,
  };
});
