import { ref, watch } from 'vue';

export const useModal = () => {
  const isModalOpen = ref(false);
  const setIsModalOpen = (value: boolean) => {
    isModalOpen.value = value;
  };

  const showAlert = (message: string) => {
    alert(message);
  };

  const showConfirm = (message: string) => {
    confirm(message);
  };

  const showModal = () => {
    isModalOpen.value = true;
  };

  const hideModal = () => {
    isModalOpen.value = false;
  };

  watch(isModalOpen, newValue => {
    if (newValue) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  });

  return {
    isModalOpen,

    setIsModalOpen,
    showAlert,
    showConfirm,
    showModal,
    hideModal,
  };
};
