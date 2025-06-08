<template>
  <div v-if="currentPost" class="post-container">
    <h1 class="post-title">{{ currentPost.title }}</h1>
    <div class="post-meta">
      <span>작성자: {{ currentPost.user.name }}</span>
      <span>작성일: {{ formatDate(currentPost.date) }}</span>
    </div>
    <div class="post-content">{{ currentPost.content }}</div>
    <div class="post-stats">
      <span>조회수: {{ currentPost.view }}</span>
      <span>좋아요: {{ currentPost.likes.length }}</span>
      <span>싫어요: {{ currentPost.dislikes.length }}</span>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
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
