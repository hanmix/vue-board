<template>
  <div class="pagination">
    <button @click="moveToFirstPage" :disabled="currentPage <= 1">맨 앞</button>
    <button @click="prevPage" :disabled="currentPage <= 1">이전</button>
    <span>페이지 {{ currentPage }} / {{ totalPage }}</span>
    <button @click="nextPage" :disabled="currentPage >= totalPage">다음</button>
    <button @click="moveToLastPage" :disabled="currentPage >= totalPage">
      맨 뒤
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables';

const { moveToFirstPage, moveToLastPage, prevPage, nextPage } = usePagination();

const { currentPage, totalPage } = defineProps<{
  currentPage: number;
  totalPage: number;
}>();
</script>
