<template>
  <header class="header">
    <h1>게시글 목록</h1>
    <div style="display: flex; gap: 10px">
      <RouterLink to="/newpost">글쓰기</RouterLink>
      <RouterLink to="/mypage">마이페이지</RouterLink>
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
      <PostItem v-if="post.type === 'post'" :post="post" />
    </div>
  </section>

  <section class="pagination-section">
    <Pagination v-if="totalPosts" :currentPage="page" :totalPage="lastPage" />
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { usePost } from '@/composables';
import { useRoute } from 'vue-router';
import SearchFilter from '@/components/SearchFilter.vue';
import Pagination from '@/components/Pagination.vue';
import PostItem from './PostItem.vue';

const route = useRoute();
const { loading, error, postList, page, lastPage, totalPosts, fetchPosts } =
  usePost();

/**
 * 페이지 변경 시 게시글 목록 조회
 */
watch(
  page,
  () => {
    fetchPosts();
  },
  { immediate: true }
);

watch(
  () => route.fullPath,
  (newVal, oldVal) => {
    // 경로가 완전히 똑같아도 강제로 fetch 호출
    if (newVal === oldVal) {
      fetchPosts();
    }
  }
);
</script>
