import { createApp } from 'vue';
import './assets/main.css';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './routers/router';

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');
