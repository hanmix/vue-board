<template>
  <li class="post-item">
    <div class="post-header">
      <router-link :to="{ name: 'board-detail' }" class="post-title">{{
        post.title
      }}</router-link>
      <div class="post-meta">
        <span>{{ post.user.name }}</span>
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
</template>

<script setup lang="ts">
import { Post } from '@/types';
import { formatDate } from '@/utils';

const { post } = defineProps<{
  post: Post;
}>();
</script>
