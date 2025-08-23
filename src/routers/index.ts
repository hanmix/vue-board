// 즉시 로드 - 첫 방문 시 필요한 컴포넌트들
import HomePage from '@/pages/HomePage.vue';
import BoardLayout from '@/pages/BoardLayout.vue';
import { SignIn, SignUp } from '@/components/features/auth';
import type { RouteRecordRaw } from 'vue-router';
import { RouteName } from '@/types/navigate';

// Lazy 로드 - 사용자 액션 후 필요한 컴포넌트들
const BoardList = () => import('@/components/features/board/BoardList.vue');
const BoardDetail = () => import('@/components/features/board/BoardDetail.vue');
const UserProfile = () => import('@/components/features/user/UserProfile.vue');
const NoticeBoard = () => import('@/components/features/board/NoticeBoard.vue');
const TestDesignSystem = () => import('@/views/TestDesignSystem.vue');

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.HOME,
    component: HomePage,
  },
  {
    path: '/signIn',
    name: RouteName.SIGN_IN,
    component: SignIn,
  },
  {
    path: '/signUp',
    name: RouteName.SIGN_UP,
    component: SignUp,
  },
  {
    path: '/board',
    name: RouteName.BOARD,
    meta: { requiresAuth: true },
    component: BoardLayout,
    redirect: { name: RouteName.FREE },
    children: [
      {
        path: 'notice',
        name: RouteName.NOTICE,
        component: NoticeBoard,
      },
      {
        path: 'free',
        name: RouteName.FREE,
        component: BoardList,
      },
      {
        path: 'detail/:id',
        name: RouteName.BOARD_DETAIL,
        component: BoardDetail,
        props: true,
      },
    ],
  },
  {
    path: '/mypage',
    name: RouteName.MYPAGE,
    meta: { requiresAuth: true },
    component: BoardLayout, // 기존 BoardLayout 사용하여 탭 유지
    children: [
      {
        path: '',
        component: UserProfile,
      },
    ],
  },
  {
    path: '/design-system',
    name: 'DesignSystem',
    component: TestDesignSystem,
  },
] as RouteRecordRaw[];
