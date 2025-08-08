import MainPage from '@/pages/MainPage.vue';
import BoardPage from '@/pages/BoardPage.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import Posts from '@/components/Posts.vue';
import PostDetail from '@/components/PostDetail.vue';
import type { RouteRecordRaw } from 'vue-router';
import Mypage from '@/components/Mypage.vue';

export const routes: RouteRecordRaw[] = [
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
      {
        path: '/mypage',
        name: 'mypage',
        meta: { requiresAuth: true },
        component: Mypage,
      },
    ],
  },
] as RouteRecordRaw[];
