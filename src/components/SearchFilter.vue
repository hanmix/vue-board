<template>
  <form class="search-form" @submit.prevent="onSearch">
    <select
      id="search-type"
      name="searchType"
      class="form-element"
      v-model="searchType"
    >
      <option
        v-for="option in searchOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <input
      id="search-keyword"
      name="searchKeyword"
      type="text"
      class="form-element"
      v-model="searchKeyword"
      placeholder="검색어 입력"
    />

    <button type="submit" class="form-element search-button">검색</button>
  </form>
</template>

<script setup lang="ts">
import { usePagination, usePost } from '@/composables';

const { searchOptions, onSearch } = usePagination();
const { searchKeyword, searchType } = usePost();
</script>
