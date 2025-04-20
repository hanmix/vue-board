<template>
  <ul class="post-list">
    <li class="post-item">
      <div class="post-header">
        <h2 class="post-title">{{ post.title }}</h2>
        <div class="post-meta">
          <span>작성자: {{ post.user.name }}</span>
          <span>작성일: {{ formatDate(post.date) }}</span>
        </div>
      </div>
      <p class="post-content">{{ post.content }}</p>
      <div class="post-stats">
        <span>조회수: {{ post.view }}</span>
        <span>좋아요: {{ post.likes.length }}</span>
        <span>싫어요: {{ post.dislikes.length }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils';
import { Post } from '@/types';

const { post } = defineProps<{
  post: Post;
}>();
</script>

<style scoped>
.post-item span {
  padding-inline: 5px;
}
.post-list {
  list-style: none;
  padding: 0;
}
.post-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
.post-meta {
  font-size: 0.9rem;
  color: #555;
}
</style>
