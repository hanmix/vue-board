<template>
  <main class="board-layout">
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
import { BoardItem } from '@/components/features/board';
import { Pagination } from '@/components/ui';
import { VLoadingSpinner, VErrorMessage } from '@/design-system/components';

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
const { getUserById } = useUser();
const { getCurrentUser } = useAuth();

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
