<template>
  <header class="header">
    <h1>공지게시판</h1>
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

  <section class="pagination-section">
    <Pagination
      v-if="totalPosts && !loading && !error"
      :currentPage="page"
      :totalPage="lastPage"
    />
  </section>
</template>

<script setup lang="ts">
import SearchFilter from './SearchFilter.vue';
import Pagination from './Pagination.vue';
import PostItem from './PostItem.vue';
import { usePost } from '@/composables';
import { watch } from 'vue';
import { BoardType } from '@/types';

const { loading, error, postList, page, lastPage, totalPosts, fetchPosts } =
  usePost();

const boardType = BoardType.NOTICE;

watch(
  page,
  () => {
    fetchPosts(BoardType.NOTICE);
  },
  {
    immediate: true,
  }
);
</script>
