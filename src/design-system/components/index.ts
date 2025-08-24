import type { App } from 'vue';

// Base Components
export { default as VAlert } from './base/VAlert';
export { default as VButton } from './base/VButton';
export { default as VCard } from './base/VCard';
export { default as VDropdown } from './base/VDropdown';
export { VDropdownItem } from './base/VDropdown';
export { default as VIcon } from './base/VIcon';
export { default as VModal } from './base/VModal';
export { default as VToastContainer } from './base/VToastContainer';

// Layout Components
export { default as VContainer } from './layout/VContainer';

// Feedback Components
export { default as VLoadingSpinner } from './feedback/VLoadingSpinner';
export { default as VErrorMessage } from './feedback/VErrorMessage';

// 전체 설치 함수 (선택적 설치 지원)
export interface DesignSystemOptions {
  components?: string[];
  prefix?: string;
}

// 컴포넌트 맵
const componentMap = {
  VButton: () => import('./base/VButton'),
  VCard: () => import('./base/VCard'),
  VDropdown: () => import('./base/VDropdown'),
  VIcon: () => import('./base/VIcon'),
  VModal: () => import('./base/VModal'),
  VContainer: () => import('./layout/VContainer'),
  VLoadingSpinner: () => import('./feedback/VLoadingSpinner'),
  VErrorMessage: () => import('./feedback/VErrorMessage'),
};

export default {
  install(app: App, options: DesignSystemOptions = {}) {
    const { components = Object.keys(componentMap), prefix = '' } = options;

    // 선택적 컴포넌트 등록 (번들 크기 최적화)
    components.forEach(async componentName => {
      if (componentName in componentMap) {
        const componentLoader =
          componentMap[componentName as keyof typeof componentMap];
        const component = await componentLoader();
        const registrationName = prefix + componentName;
        app.component(registrationName, component.default);
      }
    });
  },
};