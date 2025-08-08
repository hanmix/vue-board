<template>
  <div class="post-item">
    <div class="post-header">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        "
      >
        <router-link
          :to="{ name: 'board-detail', params: { id: post.id } }"
          class="post-title"
          >{{ post.title }}</router-link
        >
        <p>{{ convertToValue(post.type) }}</p>
      </div>
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
  </div>
</template>

<script setup lang="ts">
import { Post } from '@/types';
import { formatDate } from '@/utils';

const convertToValue = (type: string) => {
  switch (type) {
    case 'post':
      return '게시글';
    case 'reply':
      return '답글';
    default:
      return '게시글';
  }
};

const { post } = defineProps<{
  post: Post;
}>();
</script>
