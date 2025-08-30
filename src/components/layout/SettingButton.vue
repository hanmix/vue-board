<template>
  <VDropdown :vertical-offset="30">
    <template #trigger="{ isOpen }">
      <VButton variant="ghost" :size="isMobile ? 'sm' : 'md'">
        <VIcon :name="'gear'" :size="isMobile ? 'sm' : 'md'" />
      </VButton>
    </template>

    <template #menu="{ close }">
      <VDropdownItem @click="close">
        <VButton variant="ghost" size="sm" @click="handleUserProfile(close)">
          프로필
        </VButton>
      </VDropdownItem>
      <VDropdownItem @click="handleMypage(close)">
        <VButton variant="ghost" size="sm"> 내 게시글 </VButton>
      </VDropdownItem>
      <VDropdownItem destructive @click="handleLogout(close)">
        <VButton variant="ghost" size="sm"> 로그아웃 </VButton>
      </VDropdownItem>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import { VButton, VDropdown, VDropdownItem, VIcon } from '@/design-system';
import { useAuth, useBreakpoint, useNavigation } from '@/composables';

const { isMobile } = useBreakpoint();
const { closeSearchOnNavigation, navigate } = useNavigation();
const { logout } = useAuth();

const handleUserProfile = (closeDropdown: () => void) => {
  closeDropdown();
  console.log('handleUserProfile');
};

const handleMypage = (closeDropdown: () => void) => {
  closeSearchOnNavigation();
  closeDropdown();
  navigate('/mypage');
};

function handleLogout(closeDropdown: () => void) {
  closeDropdown();
  const confirmed = confirm('정말 로그아웃 하시겠습니까?');
  if (!confirmed) return;
  logout();
  navigate('/signIn');
}
</script>
