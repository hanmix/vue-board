<template>
  <header class="header">
    <h1>게시글 목록</h1>
    <div class="logout">
      <button @click="logout">로그아웃</button>
    </div>
  </header>

  <section class="search-section">
    <SearchFilter />
  </section>

  <section class="posts-section">
    <div v-if="loading" class="loading">로딩중...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="!postList.length" class="empty">게시글이 없습니다.</div>

    <div v-else v-for="post in postList" :key="post.id">
      <PostItem :post="post" />
    </div>
  </section>

  <section class="pagination-section">
    <Pagination v-if="totalPosts" :currentPage="page" :totalPage="lastPage" />
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useUser, usePost } from '@/composables';
import SearchFilter from '@/components/SearchFilter.vue';
import Pagination from '@/components/Pagination.vue';
import PostItem from './PostItem.vue';

const { logout } = useUser();
const { loading, error, postList, page, lastPage, totalPosts, fetchPosts } =
  usePost();

/**
 * 페이지 변경 시 게시글 목록 조회
 */
watch(
  page,
  async () => {
    await fetchPosts();
  },
  { immediate: true }
);
</script>
