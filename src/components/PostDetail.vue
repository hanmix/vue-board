<template>
  <div v-if="currentPost">
    <div>제목: {{ currentPost.title }}</div>
    <div>작성자: {{ currentPost.user.name }}</div>
    <div>작성일: {{ formatDate(currentPost.date) }}</div>
    <div>내용: {{ currentPost.content }}</div>
    <div>조회수: {{ currentPost.view }}</div>
    <div>좋아요: {{ currentPost.likes.length }}</div>
    <div>싫어요: {{ currentPost.dislikes.length }}</div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { usePost } from '@/composables';
import { formatDate } from '@/utils';
import { onMounted } from 'vue';

const { id } = defineProps<{
  id: string;
}>();

const { currentPost, fetchPostById } = usePost();

const handleFetchPostById = async () => {
  try {
    if (!id) return;
    await fetchPostById(id);
  } catch (error) {
    console.error('handleFetchPostById 호출 에러:', error);
    throw error;
  }
};

onMounted(async () => {
  await handleFetchPostById();
});
</script>
