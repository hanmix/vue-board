<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage <= 1">이전</button>
    <span>페이지 {{ currentPage }} / {{ totalPage }}</span>
    <button @click="nextPage" :disabled="currentPage >= totalPage">다음</button>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/composables';

const { prevPage, nextPage } = usePagination();

const { currentPage, totalPage } = defineProps<{
  currentPage: number;
  totalPage: number;
}>();
</script>
