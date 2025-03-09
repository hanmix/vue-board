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

    <section class="posts-section">
      <div v-if="postStore.loading" class="loading">로딩중...</div>

      <div v-else-if="postStore.error" class="error">{{ postStore.error }}</div>

      <div v-else-if="!postStore.postList.length" class="empty">
        게시글이 없습니다.
      </div>

      <Posts
        v-else
        v-for="post in postStore.postList"
        :key="post.id"
        :post="post"
      />
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
import { onBeforeMount } from 'vue';

const userStore = useUserStore();
const postStore = usePostStore();

const fetchData = async () => {
  await postStore.fetchPosts();
};

const prevPage = async (): Promise<void> => {
  if (postStore.page > 1) {
    postStore.page--;
    fetchData();
  }
};

const nextPage = async (): Promise<void> => {
  if (postStore.page < postStore.lastPage) {
    postStore.page++;
    fetchData();
  }
};

// NOTE: Life Cycle
onBeforeMount(() => {
  fetchData();
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
