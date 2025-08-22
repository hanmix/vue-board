<template>
  <div class="pagination">
    <button
      class="pagination-btn pagination-first"
      @click="moveToFirstPage"
      :disabled="currentPage <= 1"
      title="첫 페이지로"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polygon points="19,20 9,12 19,4" />
        <line x1="5" y1="19" x2="5" y2="5" />
      </svg>
    </button>

    <button
      class="pagination-btn pagination-prev"
      @click="prevPage"
      :disabled="currentPage <= 1"
      title="이전 페이지"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="15,18 9,12 15,6" />
      </svg>
    </button>

    <div class="pagination-info">
      <span class="current-page">{{ currentPage }}</span>
      <span class="page-separator">/</span>
      <span class="total-page">{{ totalPage }}</span>
    </div>

    <button
      class="pagination-btn pagination-next"
      @click="nextPage"
      :disabled="currentPage >= totalPage"
      title="다음 페이지"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="9,18 15,12 9,6" />
      </svg>
    </button>

    <button
      class="pagination-btn pagination-last"
      @click="moveToLastPage"
      :disabled="currentPage >= totalPage"
      title="마지막 페이지로"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polygon points="5,4 15,12 5,20" />
        <line x1="19" y1="5" x2="19" y2="19" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
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
