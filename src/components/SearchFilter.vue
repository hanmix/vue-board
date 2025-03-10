<template>
  <form @submit.prevent="onSearch" class="search-form">
    <select v-model="searchType">
      <option
        v-for="searchOption in searchOptions"
        :key="searchOption.value"
        :value="searchOption.value"
      >
        {{ searchOption.label }}
      </option>
    </select>
    <input type="text" v-model="searchKeyword" placeholder="검색어 입력" />
    <button type="submit">검색</button>
  </form>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables';

const { searchKeyword, searchType, searchOptions, onSearch } = usePagination();
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
