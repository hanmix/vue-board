import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/routers/router';

// 디자인 시스템 import (트리 셰이킹 지원)
import VueBoardDesignSystem from './design-system';

const pinia = createPinia();
const app = createApp(App);

// 디자인 시스템 등록 (선택적 설치)
app.use(VueBoardDesignSystem, {
  // 필요한 컴포넌트만 등록 (번들 크기 최적화)
  components: ['VButton', 'VCard', 'VContainer'],
  prefix: '', // 접두어 없이 사용
});

app.use(pinia).use(router).mount('#app');
