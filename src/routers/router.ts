import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores';
import { routes } from '@/routers';
import { useModal } from '@/composables';
import { storeToRefs } from 'pinia';

const { showAlert } = useModal();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const userStore = useUserStore();
  const { isAuthenticated } = storeToRefs(userStore);
  const isRequiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (isRequiresAuth && !isAuthenticated.value) {
    showAlert('로그인이 필요한 페이지 입니다.');
    return next({ name: 'signIn', replace: true });
  }
  next();
});

export default router;
