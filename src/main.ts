import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/routers/router';
// 디자인 시스템에서 자동으로 스타일을 import하므로 별도 import 불필요
import '@/design-system/styles/index.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router).mount('#app');
