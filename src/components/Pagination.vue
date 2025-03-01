<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ page: number; lastPage: number }>();
const emit = defineEmits<{ (event: 'update:page', value: number): void }>();

const prevPage = () => {
  if (props.page > 1) emit('update:page', props.page - 1);
};
const nextPage = () => {
  if (props.page < props.lastPage) emit('update:page', props.page + 1);
};
</script>

<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="page <= 1">이전</button>
    <span> {{ page }} / {{ lastPage }} </span>
    <button @click="nextPage" :disabled="page >= lastPage">다음</button>
  </div>
</template>

<style scoped>
.pagination {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
