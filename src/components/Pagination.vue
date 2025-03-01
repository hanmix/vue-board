<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">이전</button>
    <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      다음
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'prev-page'): void;
  (e: 'next-page'): void;
}>();

const prevPage = () => {
  emit('prev-page');
};

const nextPage = () => {
  emit('next-page');
};
</script>

<style scoped>
.pagination {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
