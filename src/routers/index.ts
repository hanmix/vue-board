// 즉시 로드 - 첫 방문 시 필요한 컴포넌트들
import MainPage from '@/pages/MainPage.vue';
import BoardPage from '@/pages/BoardPage.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import type { RouteRecordRaw } from 'vue-router';

// Lazy 로드 - 사용자 액션 후 필요한 컴포넌트들
const Posts = () => import('@/components/Posts.vue');
const PostDetail = () => import('@/components/PostDetail.vue');
const Mypage = () => import('@/components/Mypage.vue');
const NoticeBoard = () => import('@/components/NoticeBoard.vue');

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
    redirect: { name: 'free' },
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: NoticeBoard,
      },
      {
        path: 'free',
        name: 'free',
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
        component: Mypage,
      },
    ],
  },
] as RouteRecordRaw[];
