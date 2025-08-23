import VContainer from './VContainer.vue';
import type { App } from 'vue';

VContainer.install = (app: App) => {
  app.component('VContainer', VContainer);
};

export default VContainer;
export type { ContainerProps } from './VContainer.vue';