<template>
  <div class="posts-container">
    <header class="header">
      <div class="header-content">
        <h1>자유게시판</h1>
        <div class="header-actions">
          <SearchFilter :boardType="boardType" />
        </div>
      </div>
    </header>
    <section class="posts-section">
      <div v-if="loading" class="loading">로딩중...</div>

      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else-if="!postList.length" class="empty">게시글이 없습니다.</div>

      <div v-else v-for="post in postList" :key="post.id">
        <PostItem :post="post" />
      </div>
    </section>

    <FloatingButton />

    <section class="pagination-section">
      <Pagination
        v-if="totalPosts && !loading && !error"
        :currentPage="page"
        :totalPage="lastPage"
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
import { watch } from 'vue';
import { usePost, useModal } from '@/composables';
import { useModalStore } from '@/stores/modal';
import SearchFilter from '@/components/SearchFilter.vue';
import Pagination from '@/components/Pagination.vue';
import PostItem from './PostItem.vue';
import FloatingButton from './FloatingButton.vue';

// lazy loading을 preload 방식으로 개선
import NewPostModal from './NewPostModal.vue';
import { BoardType } from '@/types';

const { loading, error, postList, page, lastPage, totalPosts, fetchPosts } =
  usePost();
const { showModal, hideModal } = useModal();
const modalStore = useModalStore();

defineEmits(['onClose', 'onCreate', 'onUpdate']);

const boardType = BoardType.FREE;

function handleCreate() {
  showModal();
}

function handleUpdate() {
  fetchPosts(boardType);
  hideModal();
}

/**
 * 페이지 변경 시 게시글 목록 조회
 */
watch(
  page,
  () => {
    fetchPosts(boardType);
  },
  { immediate: true }
);
</script>
