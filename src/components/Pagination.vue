<template>
  <div class="pagination">
    <button @click="emitPrev" :disabled="props.currentPage <= 1">이전</button>
    <span>페이지 {{ props.currentPage }} / {{ props.totalPage }}</span>
    <button @click="emitNext" :disabled="props.currentPage >= props.totalPage">
      다음
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPage: number;
}>();

const emit = defineEmits<{
  (e: 'prevPage'): void;
  (e: 'nextPage'): void;
}>();

const emitPrev = () => emit('prevPage');
const emitNext = () => emit('nextPage');
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
