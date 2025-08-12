<template>
  <div class="post-item">
    <div class="post-header">
      <div class="post-title">
        <div>
          <router-link
            :to="{ name: 'board-detail', params: { id: post.id } }"
            >{{
              post.type === 'reply' ? 'Re: ' + post.title : post.title
            }}</router-link
          >
        </div>
      </div>
      <div class="post-meta">
        <span>작성자: {{ post.user.name }}</span>
        <span>작성일: {{ formatDate(post.date) }}</span>
      </div>
    </div>
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

const { post } = defineProps<{
  post: Post;
}>();
</script>
