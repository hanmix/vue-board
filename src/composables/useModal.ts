export const useModal = () => {
  const showAlert = (message: string) => {
    alert(message);
  };

  const showConfirm = (message: string) => {
    confirm(message);
  };

  return {
    showAlert,
    showConfirm,
  };
};
