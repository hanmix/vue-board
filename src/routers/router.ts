import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import BoardPage from '@/pages/BoardPage.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import { useUserStore } from '@/stores/user';
import Posts from '@/components/Posts.vue';
import PostDetail from '@/components/PostDetail.vue';

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
        path: '',
        name: 'board-list',
        component: Posts,
      },
      {
        path: 'detail/:id',
        name: 'board-detail',
        component: PostDetail,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useUserStore();
  const isRequiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (isRequiresAuth && !isAuthenticated) return next({ name: 'signIn' });
  next();
});

export default router;
