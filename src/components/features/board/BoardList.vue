<template>
  <div class="board-list">
    <!-- Search Header -->
    <VCard variant="outlined" padding="md" class="search-section">
      <SearchFilter
        :boardType="boardType"
        :searchKeyword="searchKeyword"
        :searchType="searchType"
        :onSearch="setSearch"
      />
    </VCard>

    <!-- Posts Section -->
    <div class="posts-section">
      <!-- Loading State -->
      <div v-if="loading" class="state-container">
        <VCard variant="outlined" padding="lg">
          <div class="loading-state">
            <div class="loading-spinner"></div>
            <p class="loading-text">게시글을 불러오는 중...</p>
          </div>
        </VCard>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="state-container">
        <VCard variant="outlined" padding="lg" class="error-card">
          <div class="error-state">
            <span class="error-icon">⚠️</span>
            <h3 class="error-title">오류가 발생했습니다</h3>
            <p class="error-message">{{ error }}</p>
            <VButton variant="primary" @click="refetch">다시 시도</VButton>
          </div>
        </VCard>
      </div>

      <!-- Empty State -->
      <div v-else-if="!posts.length" class="state-container">
        <VCard variant="outlined" padding="lg">
          <div class="empty-state">
            <span class="empty-icon">📝</span>
            <h3 class="empty-title">게시글이 없습니다</h3>
            <p class="empty-message">첫 번째 게시글을 작성해보세요!</p>
            <VButton variant="primary" @click="showModal">글 작성하기</VButton>
          </div>
        </VCard>
      </div>

      <!-- Posts List -->
      <div v-else class="posts-list">
        <div v-for="post in posts" :key="post.id" class="post-item">
          <BoardItem :post="post" />
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <FloatingButton />

    <!-- Pagination -->
    <div v-if="totalPosts && !loading && !error" class="pagination-section">
      <Pagination
        :currentPage="currentPage"
        :totalPage="lastPage"
        :onPageChange="goToPage"
      />
    </div>

    <!-- New Post Modal -->
    <NewPostModal
      v-if="modalStore.isVisible"
      @onClose="hideModal"
      @onCreate="handleCreate"
      @onUpdate="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { useBoardData, useModal } from '@/composables';
import { useModalStore } from '@/stores/modal';
import { SearchFilter, Pagination } from '@/components/ui';
import BoardItem from './BoardItem.vue';
import { FloatingButton } from '@/components/features';
import NewPostModal from './NewPostModal.vue';
import { BoardType } from '@/types';

const {
  posts,
  loading,
  error,
  currentPage,
  lastPage,
  totalPosts,
  searchKeyword,
  searchType,
  goToPage,
  setSearch,
  refetch,
} = useBoardData(BoardType.FREE);

const { showModal, hideModal } = useModal();
const modalStore = useModalStore();

defineEmits(['onClose', 'onCreate', 'onUpdate']);

function handleCreate() {
  showModal();
}

const boardType = BoardType.FREE;

function handleUpdate() {
  refetch();
  hideModal();
}
</script>

<style scoped>
.board-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  min-height: 60vh;
}

/* Search Section */
.search-section {
  position: sticky;
  top: calc(var(--space-8) + 80px);
  z-index: var(--z-sticky);
  background-color: var(--color-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Posts Section */
.posts-section {
  flex: 1;
}

.state-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

/* Loading State */
.loading-state {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-card {
  border-color: var(--color-danger);
  background-color: rgba(239, 68, 68, 0.05);
}

.error-state {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.error-icon {
  font-size: var(--font-size-4xl);
}

.error-title {
  color: var(--color-danger);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.error-message {
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  margin: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.empty-icon {
  font-size: var(--font-size-4xl);
}

.empty-title {
  color: var(--color-text);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.empty-message {
  color: var(--color-text-muted);
  font-size: var(--font-size-base);
  margin: 0;
}

/* Posts List */
.posts-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.post-item {
  transition: transform var(--transition-base);
}

.post-item:hover {
  transform: translateY(-1px);
}

/* Pagination Section */
.pagination-section {
  display: flex;
  justify-content: center;
  padding: var(--space-6) 0;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .board-list {
    gap: var(--space-4);
  }

  .search-section {
    position: static;
    top: auto;
  }

  .state-container {
    min-height: 200px;
  }

  .posts-list {
    gap: var(--space-2);
  }

  .pagination-section {
    padding: var(--space-4) 0;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: none;
  }

  .post-item:hover {
    transform: none;
  }
}
</style>
