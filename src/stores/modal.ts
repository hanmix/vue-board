import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ModalPayload, ModalType } from '@/types/modal';

export const useModalStore = defineStore('modalStore', () => {
  const type = ref<ModalType | null>(null);
  const payload = ref<ModalPayload>({});
  const isVisible = ref(false);

  const showAlert = (message: string) => {
    alert(message);
  };

  const showConfirm = (message: string) => {
    return confirm(message);
  };

  const open = (modalType: ModalType, data: ModalPayload = {}) => {
    type.value = modalType;
    payload.value = data;
    isVisible.value = true;
  };

  const close = () => {
    isVisible.value = false;
    type.value = null;
    payload.value = {};
  };

  const showModal = () => {
    isVisible.value = true;
  };

  const hideModal = () => {
    isVisible.value = false;
  };

  return {
    type,
    payload,
    isVisible,

    showAlert,
    showConfirm,
    open,
    close,
    showModal,
    hideModal,
  };
});
