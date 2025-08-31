<template>
  <main class="board-layout">
    <div class="header mypage-header">
      <div class="header-controls">
        <!-- 테마 설정 -->
        <div class="theme-control">
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

        <VButton :variant="'ghost'" @click="handleLogout" class="logout-btn">
          로그아웃
        </VButton>
      </div>
    </div>

    <section class="userInfo-section">
      <div v-if="currentUserFromAuth || currentUser">
        <h2 class="section-title">내 정보</h2>
        <ul>
          <li>id: {{ currentUserFromAuth?.id || currentUser?.id }}</li>
          <li v-if="currentUser?.email">email: {{ currentUser.email }}</li>
          <li v-if="currentUser?.name">name: {{ currentUser.name }}</li>
        </ul>
      </div>
    </section>

    <section class="board-list">
      <h2 class="section-title">내 게시글</h2>

      <VLoadingSpinner
        v-if="loading"
        size="md"
        message="게시글을 불러오는 중..."
        class="centered-state"
      />

      <VErrorMessage
        v-else-if="error"
        :message="error"
        title="내 게시글을 불러올 수 없습니다"
        severity="error"
        class="centered-state"
      />

      <div v-else-if="!filteredPosts.length" class="empty-state centered-state">
        게시글이 없습니다.
      </div>

      <div v-else class="posts-list">
        <BoardItem
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          :isMypage="isMypage"
        />
      </div>
    </section>

    <Pagination
      v-if="totalPosts && !loading && !error"
      :currentPage="currentPage"
      :totalPage="lastPage"
      :onPageChange="goToPage"
      class="pagination"
    />
  </main>
</template>

<script setup lang="ts">
import './UserProfile.css';
import { useMyPageData, useUser, useAuth, usePost } from '@/composables';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { BoardItem } from '@/components/features/board';
import { Pagination } from '@/components/ui';
import {
  VLoadingSpinner,
  VErrorMessage,
  VButton,
} from '@/design-system/components';
import { useTheme } from '@/design-system/composables';

const {
  filteredPosts,
  loading,
  error,
  totalPosts,
  currentPage,
  lastPage,
  goToPage,
} = useMyPageData();
const { isMypage } = usePost(); // isMypage는 여전히 usePost에서 가져옴
const { currentUser, getUserById } = useUser();
const { logout, getCurrentUser } = useAuth();
const router = useRouter();

// 테마 관리
const { themeMode, setTheme, isDark } = useTheme();

const currentUserFromAuth = computed(() => getCurrentUser());

const setData = async () => {
  // JWT에서 기본 정보를 우선 사용하고, 추가 정보가 필요하면 API 호출
  if (currentUserFromAuth.value?.id) {
    await getUserById();
  }
};

function handleLogout() {
  const confirmed = confirm('정말 로그아웃 하시겠습니까?');
  if (!confirmed) return;
  logout();
  router.push('/signIn');
}

onMounted(async () => {
  await setData();
});
</script>
