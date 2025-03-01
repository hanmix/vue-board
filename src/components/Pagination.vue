<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">이전</button>
    <span>페이지 {{ props.currentPage }} / {{ props.totalPages }}</span>
    <button
      @click="nextPage"
      :disabled="props.currentPage === props.totalPages"
    >
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
  justify-content: center;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #2c3e50; /* 차분한 다크 블루-그레이 계열 */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #34495e;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
