<template>
  <div class="board-container">
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

      <Posts v-else v-for="post in postList" :key="post.id" :post="post" />
    </section>

    <section class="pagination-section">
      <Pagination
        v-if="totalPosts"
        :currentPage="page"
        :totalPage="lastPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
      />
    </section>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { usePagination, useUser, usePost } from '@/composables';
import Posts from '@/components/Posts.vue';
import SearchFilter from '@/components/SearchFilter.vue';
import Pagination from '@/components/Pagination.vue';

const { prevPage, nextPage } = usePagination();
const { logout } = useUser();
const { loading, error, postList, page, lastPage, totalPosts, fetchPosts } =
  usePost();

// NOTE: Life Cycle
onBeforeMount(() => {
  fetchPosts();
});
</script>

<style>
.board-container {
  margin: 0 auto;
  padding: 1rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.logout button {
  padding: 0.5rem 1rem;
}
.posts-section {
  margin-bottom: 1rem;
}
.pagination-section {
  display: flex;
  justify-content: center;
}
.loading,
.error,
.empty {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 1rem 0;
  height: 200px;
  font-size: 18px;
}
</style>
