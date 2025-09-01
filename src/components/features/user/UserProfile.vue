<template>
  <main class="board-layout">
    <section class="profile-header">
      <div class="header-controls">
        <!-- 테마 설정 -->
        <label class="theme-label">테마 설정</label>
        <div class="theme-buttons">
          <VButton
            :variant="themeMode === 'light' ? 'primary' : 'ghost'"
            size="sm"
            @click="setTheme('light')"
            class="theme-button"
          >
            🌞 라이트
          </VButton>
          <VButton
            :variant="themeMode === 'dark' ? 'primary' : 'ghost'"
            size="sm"
            @click="setTheme('dark')"
            class="theme-button"
          >
            🌙 다크
          </VButton>
          <VButton
            :variant="themeMode === 'system' ? 'primary' : 'ghost'"
            size="sm"
            @click="setTheme('system')"
            class="theme-button"
          >
            💻 시스템
          </VButton>
        </div>
      </div>
    </section>

    <section>
      <div v-if="currentUserFromAuth || currentUser" class="profile-header">
        <div class="my-info">
          <h2 class="theme-label">내 정보</h2>
          <p>id: {{ currentUserFromAuth?.id || currentUser?.id }}</p>
          <p v-if="currentUser?.email">email: {{ currentUser.email }}</p>
          <p v-if="currentUser?.name">name: {{ currentUser.name }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import './UserProfile.css';
import { useUser, useAuth } from '@/composables';
import { computed, onMounted } from 'vue';
import { VButton } from '@/design-system/components';
import { useTheme } from '@/design-system/composables';
const { currentUser, getUserById } = useUser();
const { getCurrentUser } = useAuth();

// 테마 관리
const { themeMode, setTheme } = useTheme();

const currentUserFromAuth = computed(() => getCurrentUser());

const setData = async () => {
  // JWT에서 기본 정보를 우선 사용하고, 추가 정보가 필요하면 API 호출
  if (currentUserFromAuth.value?.id) {
    await getUserById();
  }
};

onMounted(async () => {
  await setData();
});
</script>
