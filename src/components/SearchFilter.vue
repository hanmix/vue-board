<template>
  <form @submit.prevent="onSearch" class="search-form">
    <select v-model="filterType">
      <option value="title">제목</option>
      <option value="content">내용</option>
      <option value="title_content">제목+내용</option>
      <option value="user">작성자</option>
    </select>
    <input type="text" v-model="searchKeyword" placeholder="검색어 입력" />
    <button type="submit">검색</button>
  </form>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores';
import { storeToRefs } from 'pinia';

const postStore = usePostStore();
const { page, searchKeyword, filterType } = storeToRefs(postStore);
const { fetchPosts } = postStore;

// 검색 시에는 첫 페이지부터 조회
const onSearch = () => {
  page.value = 1;
  fetchPosts();
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
