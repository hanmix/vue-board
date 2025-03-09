<template>
  <div class="board-container">
    <header class="header">
      <h1>게시글 목록</h1>
      <div class="logout">
        <button @click="userStore.logout">로그아웃</button>
      </div>
    </header>

    <section class="search-section">
      <SearchFilter />
    </section>

    <section>
      <Posts />
    </section>

    <section class="pagination-section">
      <Pagination
        :currentPage="postStore.page"
        :totalPage="postStore.lastPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
      />
    </section>
  </div>
</template>
<script setup lang="ts">
import { useUserStore, usePostStore } from '@/stores';
import Posts from '@/components/Posts.vue';
import SearchFilter from '@/components/SearchFilter.vue';
import Pagination from '@/components/Pagination.vue';

const userStore = useUserStore();
const postStore = usePostStore();

const prevPage = async (): Promise<void> => {
  if (postStore.page > 1) {
    postStore.page--;
    postStore.fetchPosts();
  }
};

const nextPage = async (): Promise<void> => {
  if (postStore.page < postStore.lastPage) {
    postStore.page++;
    postStore.fetchPosts();
  }
};
</script>

<style>
.board-container {
  max-width: 800px;
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
.pagination-section {
  display: flex;
  justify-content: center;
}
</style>
