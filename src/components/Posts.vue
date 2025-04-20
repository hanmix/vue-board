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

    <div v-else>
      <ul class="post-list" v-for="post in postList" :key="post.id">
        <PostItem :post="post" />
      </ul>
    </div>
  </section>

  <section class="pagination-section">
    <Pagination v-if="totalPosts" :currentPage="page" :totalPage="lastPage" />
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import { useUser, usePost } from '@/composables';
import SearchFilter from '@/components/SearchFilter.vue';
import Pagination from '@/components/Pagination.vue';

const { logout } = useUser();
const { loading, error, postList, page, lastPage, totalPosts, fetchPosts } =
  usePost();

/* NOTE: watch  */
watch(
  page,
  async () => {
    await fetchPosts();
  },
  { immediate: true }
);

// NOTE: Life Cycle
onBeforeMount(async () => {
  await fetchPosts();
});
</script>

<style scoped>
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
.post-item span {
  padding-inline: 5px;
}
.post-list {
  width: 100vw;
  list-style: none;
  padding: 0;
}
.post-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
.post-meta {
  font-size: 0.9rem;
  color: #555;
}
</style>
