<template>
  <div class="posts-container">
    <header class="header">
      <div class="header-content">
        <div class="header-actions">
          <SearchFilter
            :boardType="boardType"
            :searchKeyword="searchKeyword"
            :searchType="searchType"
            :onSearch="setSearch"
          />
        </div>
      </div>
    </header>
    <section class="posts-section">
      <div v-if="loading" class="loading">로딩중...</div>

      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else-if="!posts.length" class="empty">게시글이 없습니다.</div>

      <div v-else v-for="post in posts" :key="post.id">
        <BoardItem :post="post" />
      </div>
    </section>

    <FloatingButton />

    <section class="pagination-section">
      <Pagination
        v-if="totalPosts && !loading && !error"
        :currentPage="currentPage"
        :totalPage="lastPage"
        :onPageChange="goToPage"
      />
    </section>

    <!-- 모달 상태에 따라 조건부 렌더링 -->
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
