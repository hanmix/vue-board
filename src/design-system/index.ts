import './styles/index.css';

// 컴포넌트 export
export * from './components';

// Composables export
export * from './composables';

// 타입 export
export type { ButtonProps } from './components/base/VButton/VButton.vue';
export type { CardProps } from './components/base/VCard/VCard.vue';
export type { DropdownProps } from './components/base/VDropdown/VDropdown.vue';
export type { DropdownItemProps } from './components/base/VDropdown/VDropdownItem.vue';
export type { ModalProps } from './components/base/VModal/VModal.vue';
export type { ContainerProps } from './components/layout/VContainer/VContainer.vue';

// 기본 export
export { default } from './components';

// 버전 정보 (Vite 환경 변수 활용)
export const version = import.meta.env.VITE_DESIGN_SYSTEM_VERSION || '1.0.0';