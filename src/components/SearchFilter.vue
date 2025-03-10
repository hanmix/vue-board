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
import { usePagination } from '@/composables';

const { searchKeyword, filterType, onSearch } = usePagination();
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
