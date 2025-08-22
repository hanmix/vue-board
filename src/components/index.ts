// 메인 컴포넌트 배럴 익스포트
// 새로운 구조의 컴포넌트들
export * from './ui'
export * from './features'
export * from './layout'

// === 기존 호환성을 위한 DEPRECATED exports ===
// @deprecated Use BoardList from '@/components/features/board' instead
export { default as Posts } from './Posts.vue'

// @deprecated Use BoardItem from '@/components/features/board' instead  
export { default as PostItem } from './PostItem.vue'

// @deprecated Use BoardDetail from '@/components/features/board' instead
export { default as PostDetail } from './PostDetail.vue'

// @deprecated Use UserProfile from '@/components/features/user' instead
export { default as Mypage } from './Mypage.vue'

// @deprecated Use SignIn from '@/components/features/auth' instead
export { default as SignIn } from './SignIn.vue'

// @deprecated Use SignUp from '@/components/features/auth' instead
export { default as SignUp } from './SignUp.vue'

// @deprecated Use NewPostModal from '@/components/features/board' instead
export { default as NewPostModal } from './NewPostModal.vue'

// @deprecated Use NoticeBoard from '@/components/features/board' instead
export { default as NoticeBoard } from './NoticeBoard.vue'

// @deprecated Use FloatingButton from '@/components/features' instead
export { default as FloatingButton } from './FloatingButton.vue'

// @deprecated Use NavigationBar from '@/components/layout' instead
export { default as NavigationBar } from './NavigationBar.vue'

// @deprecated Use Pagination from '@/components/ui/navigation' instead
export { default as Pagination } from './Pagination.vue'

// @deprecated Use SearchFilter from '@/components/ui/form' instead
export { default as SearchFilter } from './SearchFilter.vue'

// @deprecated Use BaseModal from '@/components/ui/base' instead
export { default as BaseModal } from './common/BaseModal.vue'

// @deprecated Use Tabs from '@/components/ui/navigation' instead
export { default as Tabs } from './common/Tabs.vue'

// @deprecated Use Dropdown from '@/components/ui/form' instead
export { default as Dropdown } from './util/Dropdown.vue'