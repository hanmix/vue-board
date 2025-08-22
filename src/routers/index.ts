// 즉시 로드 - 첫 방문 시 필요한 컴포넌트들
import MainPage from '@/pages/MainPage.vue';
import BoardPage from '@/pages/BoardPage.vue';
import { SignIn, SignUp } from '@/components/features/auth';
import type { RouteRecordRaw, RouteRecordSingleView } from 'vue-router';

// Lazy 로드 - 사용자 액션 후 필요한 컴포넌트들
const BoardList = () => import('@/components/features/board/BoardList.vue');
const BoardDetail = () => import('@/components/features/board/BoardDetail.vue');
const UserProfile = () => import('@/components/features/user/UserProfile.vue');
const NoticeBoard = () => import('@/components/features/board/NoticeBoard.vue');

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
        component: BoardList,
      },
      {
        path: 'detail/:id',
        name: 'board-detail',
        component: BoardDetail,
        props: true,
      },
      {
        path: '/mypage',
        name: 'mypage',
        component: UserProfile,
      },
    ],
  },
] as RouteRecordRaw[];
