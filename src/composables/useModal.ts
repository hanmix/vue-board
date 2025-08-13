import { watch } from 'vue';
import { useModalStore } from '@/stores';
import { storeToRefs } from 'pinia';
import type { ModalPayload, ModalType } from '@/types';

export const useModal = () => {
  const modalStore = useModalStore();
  const { type, payload, isVisible } = storeToRefs(modalStore);
  const setIsModalOpen = (value: boolean) => {
    isVisible.value = value;
  };

  const showAlert = (message: string) => {
    alert(message);
  };

  const showConfirm = (message: string) => {
    confirm(message);
  };

  const showModal = () => {
    isVisible.value = true;
  };

  const hideModal = () => {
    isVisible.value = false;
  };

  function open(modalType: ModalType, data: ModalPayload) {
    type.value = modalType;
    payload.value = data;
    isVisible.value = true;
  }

  function close() {
    isVisible.value = false;
    type.value = null;
    payload.value = {};
  }

  watch(isVisible, newValue => {
    if (newValue) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  });

  return {
    isVisible,

    setIsModalOpen,
    showAlert,
    showConfirm,
    showModal,
    hideModal,
    open,
    close,
  };
};
