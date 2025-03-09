<template>
  <form @submit.prevent="onSearch" class="search-form">
    <select v-model="postStore.filterType">
      <option value="title">제목</option>
      <option value="content">내용</option>
      <option value="title_content">제목+내용</option>
      <option value="user">작성자</option>
    </select>
    <input
      type="text"
      v-model="postStore.searchKeyword"
      placeholder="검색어 입력"
    />
    <button type="submit">검색</button>
  </form>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores';

const postStore = usePostStore();

const fetchData = () => {
  postStore.fetchPosts();
};

// 검색 시에는 첫 페이지부터 조회
const onSearch = () => {
  postStore.page = 1;
  fetchData();
};
</script>

<style scoped>
.search-section {
  margin-bottom: 1rem;
}
.search-form {
  display: flex;
  gap: 0.5rem;
}
</style>
