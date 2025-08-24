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

    <!-- Loading State -->
    <VLoadingSpinner 
      v-if="loading"
      size="lg" 
      message="게시글을 불러오는 중..." 
      class="centered-state"
    />

    <!-- Error State -->
    <VErrorMessage
      v-else-if="error"
      :message="error"
      title="게시글을 불러올 수 없습니다"
      severity="error"
      show-retry
      @retry="refetch"
      class="centered-state"
    />

    <!-- Empty State -->
    <VCard v-else-if="!posts.length" variant="outlined" padding="lg" class="centered-state">
      <div class="empty-state">
        <span class="empty-icon">📝</span>
        <h3 class="empty-title">게시글이 없습니다</h3>
        <p class="empty-message">첫 번째 게시글을 작성해보세요!</p>
        <VButton variant="primary" @click="showModal">글 작성하기</VButton>
      </div>
    </VCard>

    <!-- Posts List -->
    <div v-else class="posts-list">
      <BoardItem v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <!-- Floating Action Button -->
    <FloatingButton />

    <!-- Pagination -->
    <Pagination
      v-if="totalPosts && !loading && !error"
      :currentPage="currentPage"
      :totalPage="lastPage"
      :onPageChange="goToPage"
      class="pagination"
    />

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
import '/src/assets/styles/components/features/board/BoardList.css';
import { useBoardData, useModal } from '@/composables';
import { useModalStore } from '@/stores/modal';
import { SearchFilter, Pagination } from '@/components/ui';
import BoardItem from './BoardItem.vue';
import { FloatingButton } from '@/components/features';
import NewPostModal from './NewPostModal.vue';
import { BoardType } from '@/types';
import { VCard, VButton, VLoadingSpinner, VErrorMessage } from '@/design-system/components';

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
