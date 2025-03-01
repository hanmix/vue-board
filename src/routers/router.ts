import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import BoardPage from '@/pages/BoardPage.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import { useUserStore } from '@/stores/user';
import BoardDetailPage from '@/pages/BoardDetailPage.vue';

export const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp,
  },
  {
    path: '/board',
    name: 'board',
    meta: { requiresAuth: true },
    component: BoardPage,
    children: [
      {
        path: 'detail',
        name: 'board-detail',
        component: BoardDetailPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const { isLoggedIn } = useUserStore();
//   const isRequiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (isRequiresAuth && !isLoggedIn) return next({ name: 'signIn' });
//   next();
// });

export default router;
