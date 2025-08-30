<template>
  <VDropdown
    :id="DROPDOWN_IDS.USER_PROFILE"
    :vertical-offset="verticalOffset"
    placement="bottom-end"
    priority="high"
    :mobile-full-width="false"
    @open="handleDropdownOpen"
  >
    <template #trigger="{ isOpen }">
      <VButton
        variant="ghost"
        size="md"
        class="user-profile-trigger"
        :class="{ 'user-profile-trigger--open': isOpen }"
        :aria-label="'설정'"
      >
        <VIcon name="gear" size="sm" />
      </VButton>
    </template>

    <template #menu="{ close }">
      <div class="user-menu">
        <div class="user-info">
          <div class="user-name">{{ '설정' }}</div>
        </div>

        <div class="menu-divider"></div>

        <VDropdownItem @click="handleUserProfile(close)">
          프로필 설정
        </VDropdownItem>

        <VDropdownItem @click="handleMypage(close)">내 게시글</VDropdownItem>

        <div class="menu-divider"></div>

        <VDropdownItem destructive @click="handleLogout(close)">
          로그아웃
        </VDropdownItem>
      </div>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import './UserProfileButton.css';
import { computed } from 'vue';
import { VButton, VDropdown, VDropdownItem, VIcon } from '@/design-system';
import { useAuth, useNavigation, useBreakpoint } from '@/composables';
import { DROPDOWN_IDS } from '@/types/dropdown';

const { closeSearchOnNavigation, navigate, isSearchVisible } = useNavigation();
const { logout } = useAuth();
const { isMobile } = useBreakpoint();

// 반응형 vertical-offset 계산
const verticalOffset = computed(() => {
  return isMobile.value ? 12 : 16;
});

// UserProfile 드롭다운이 열릴 때 검색창 닫기
const handleDropdownOpen = () => {
  if (isSearchVisible.value) {
    closeSearchOnNavigation();
  }
};

const handleUserProfile = (closeDropdownFn: () => void) => {
  closeDropdownFn();
  // TODO: 프로필 설정 페이지 구현 후 navigate('/profile') 추가
};

const handleMypage = (closeDropdownFn: () => void) => {
  closeDropdownFn();
  navigate('/mypage');
};

const handleLogout = (closeDropdownFn: () => void) => {
  closeDropdownFn();
  const confirmed = confirm('정말 로그아웃 하시겠습니까?');
  if (!confirmed) return;
  logout();
  navigate('/signIn');
};
</script>
