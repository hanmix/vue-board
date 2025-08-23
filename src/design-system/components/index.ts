import type { App } from 'vue';

// Base Components
export { default as VButton } from './base/VButton';
export { default as VCard } from './base/VCard';

// Layout Components
export { default as VContainer } from './layout/VContainer';

// 전체 설치 함수 (선택적 설치 지원)
export interface DesignSystemOptions {
  components?: string[];
  prefix?: string;
}

// 컴포넌트 맵
const componentMap = {
  VButton: () => import('./base/VButton'),
  VCard: () => import('./base/VCard'),
  VContainer: () => import('./layout/VContainer'),
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