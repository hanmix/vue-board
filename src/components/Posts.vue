<template>
  <header class="header">
    <h1>자유게시판</h1>
    <SearchFilter :boardType="boardType" />
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

  <NewPostModal
    :isVisible="isVisible"
    @onClose="hideModal"
    @onCreate="handleCreate"
    @onUpdate="handleUpdate"
  />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { usePost, useModal } from '@/composables';
import SearchFilter from '@/components/SearchFilter.vue';
import Pagination from '@/components/Pagination.vue';
import PostItem from './PostItem.vue';
import NewPostModal from './NewPostModal.vue';
import FloatingButton from './FloatingButton.vue';
import { BoardType } from '@/types';

const { loading, error, postList, page, lastPage, totalPosts, fetchPosts } =
  usePost();
const { isVisible, showModal, hideModal } = useModal();

defineEmits(['onClose', 'onCreate', 'onUpdate']);

const boardType = BoardType.FREE;

function handleCreate() {
  showModal();
}

function handleUpdate() {
  fetchPosts(BoardType.FREE);
  hideModal();
}

/**
 * 페이지 변경 시 게시글 목록 조회
 */
watch(
  page,
  () => {
    fetchPosts(BoardType.FREE);
  },
  { immediate: true }
);
</script>
