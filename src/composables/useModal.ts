import { useModalStore } from '@/stores';
import { storeToRefs } from 'pinia';

export const useModal = () => {
  const modalStore = useModalStore();
  const { type, payload, isVisible } = storeToRefs(modalStore);

  const { showAlert, showConfirm, open, close, showModal, hideModal } =
    modalStore;

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
};
