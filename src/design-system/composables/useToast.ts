import { ref } from 'vue';

export interface ToastItem {
  id: string;
  variant: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
  visible: boolean;
}

const toasts = ref<ToastItem[]>([]);

let toastIdCounter = 0;

const generateId = () => `toast-${++toastIdCounter}-${Date.now()}`;

const addToast = (options: Omit<ToastItem, 'id' | 'visible'>) => {
  const id = generateId();
  const toast: ToastItem = {
    id,
    visible: true,
    ...options,
  };

  toasts.value.push(toast);

  return id;
};

const removeToast = (id: string) => {
  const index = toasts.value.findIndex(toast => toast.id === id);
  if (index > -1) {
    // Set visible to false first to trigger transition
    toasts.value[index].visible = false;

    // Remove from array after transition completes
    setTimeout(() => {
      const currentIndex = toasts.value.findIndex(toast => toast.id === id);
      if (currentIndex > -1) {
        toasts.value.splice(currentIndex, 1);
      }
    }, 300); // Match transition duration
  }
};

const clearAllToasts = () => {
  toasts.value.forEach(toast => {
    toast.visible = false;
  });

  setTimeout(() => {
    toasts.value.splice(0);
  }, 300);
};

// Convenience methods
const showToast = (
  message: string,
  variant: ToastItem['variant'] = 'info',
  options?: Partial<ToastItem>
) => {
  return addToast({
    message,
    variant,
    duration: 5000,
    closable: true,
    ...options,
  });
};

const showSuccess = (message: string, options?: Partial<ToastItem>) => {
  return showToast(message, 'success', options);
};

const showError = (message: string, options?: Partial<ToastItem>) => {
  return showToast(message, 'error', options);
};

const showWarning = (message: string, options?: Partial<ToastItem>) => {
  return showToast(message, 'warning', options);
};

const showInfo = (message: string, options?: Partial<ToastItem>) => {
  return showToast(message, 'info', options);
};

export const useToast = () => {
  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
