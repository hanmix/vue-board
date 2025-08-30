import { ref, readonly } from 'vue';
import type { DropdownId } from '@/types/dropdown';

const activeDropdown = ref<DropdownId | null>(null);
const dropdownClosers = new Map<DropdownId, () => void>();

export const useDropdownManager = () => {
  const registerDropdown = (id: DropdownId | undefined, closeHandler: () => void) => {
    if (!id) return;
    dropdownClosers.set(id, closeHandler);
  };

  const unregisterDropdown = (id: DropdownId | undefined) => {
    if (!id) return;
    dropdownClosers.delete(id);
    // 언마운트되는 드롭다운이 현재 활성 드롭다운이라면 activeDropdown을 null로 설정
    if (activeDropdown.value === id) {
      activeDropdown.value = null;
    }
  };

  const openDropdown = (id: DropdownId | undefined) => {
    if (!id) return;
    // 현재 활성화된 드롭다운이 있다면 강제로 닫기
    if (activeDropdown.value && activeDropdown.value !== id) {
      const closeHandler = dropdownClosers.get(activeDropdown.value);
      if (closeHandler) {
        closeHandler();
      }
    }
    activeDropdown.value = id;
  };

  const closeDropdown = (id: DropdownId | undefined) => {
    if (!id) return;
    if (activeDropdown.value === id) {
      activeDropdown.value = null;
    }
  };

  const closeAllDropdowns = () => {
    // activeDropdown을 먼저 null로 설정해서 무한 호출 방지
    const currentActive = activeDropdown.value;
    activeDropdown.value = null;
    
    // 모든 등록된 드롭다운 강제로 닫기
    dropdownClosers.forEach((closeHandler) => {
      closeHandler();
    });
  };

  const isDropdownActive = (id: DropdownId | undefined) => {
    if (!id) return false;
    return activeDropdown.value === id;
  };

  const isAnyDropdownActive = () => {
    return activeDropdown.value !== null;
  };

  return {
    activeDropdown: readonly(activeDropdown),
    registerDropdown,
    unregisterDropdown,
    openDropdown,
    closeDropdown,
    closeAllDropdowns,
    isDropdownActive,
    isAnyDropdownActive,
  };
};