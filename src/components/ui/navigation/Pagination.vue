<template>
  <div class="pagination">
    <VButton
      variant="ghost"
      size="sm"
      @click="moveToFirstPage"
      :disabled="currentPage <= 1"
      :title="'첫 페이지로'"
      class="pagination-btn"
    >
      <VIcon name="first-page" size="sm" />
    </VButton>

    <VButton
      variant="ghost"
      size="sm"
      @click="prevPage"
      :disabled="currentPage <= 1"
      :title="'이전 페이지'"
      class="pagination-btn"
    >
      <VIcon name="chevron-left" size="sm" />
    </VButton>

    <div class="pagination-info">
      <span class="current-page">{{ currentPage }}</span>
      <span class="page-separator">/</span>
      <span class="total-page">{{ totalPage }}</span>
    </div>

    <VButton
      variant="ghost"
      size="sm"
      @click="nextPage"
      :disabled="currentPage >= totalPage"
      :title="'다음 페이지'"
      class="pagination-btn"
    >
      <VIcon name="chevron-right" size="sm" />
    </VButton>

    <VButton
      variant="ghost"
      size="sm"
      @click="moveToLastPage"
      :disabled="currentPage >= totalPage"
      :title="'마지막 페이지로'"
      class="pagination-btn"
    >
      <VIcon name="last-page" size="sm" />
    </VButton>
  </div>
</template>

<script setup lang="ts">
import './Pagination.css';
import { VButton, VIcon } from '@/design-system/components';

const { currentPage, totalPage, onPageChange } = defineProps<{
  currentPage: number;
  totalPage: number;
  onPageChange?: (page: number) => void;
}>();

const moveToFirstPage = () => {
  if (currentPage > 1 && onPageChange) {
    onPageChange(1);
  }
};

const moveToLastPage = () => {
  if (currentPage < totalPage && onPageChange) {
    onPageChange(totalPage);
  }
};

const prevPage = () => {
  if (currentPage > 1 && onPageChange) {
    onPageChange(currentPage - 1);
  }
};

const nextPage = () => {
  if (currentPage < totalPage && onPageChange) {
    onPageChange(currentPage + 1);
  }
};
</script>
