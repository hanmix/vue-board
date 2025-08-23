import VCard from './VCard.vue';
import type { App } from 'vue';

VCard.install = (app: App) => {
  app.component('VCard', VCard);
};

export default VCard;
export type { CardProps } from './VCard.vue';