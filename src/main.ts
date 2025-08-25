import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/routers/router';
import '../src/design-system/index';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router).mount('#app');
