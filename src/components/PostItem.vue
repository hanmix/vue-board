<template>
  <div class="post-item">
    <div class="post-header">
      postId: {{ post.id }} /// parentId: {{ post.parentId ?? 'null' }}
      <div class="post-title">
        <div
          v-if="!isParentPostExist && post.type === 'reply' && !isMypage"
          style="font-size: 1.5rem; color: grey"
        >
          {{ '원글이 삭제된 답글입니다.' }}
        </div>
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
import { usePost } from '@/composables';

const { postList } = usePost();
const { post, isMypage } = defineProps<{
  post: Post;
  isMypage?: boolean;
}>();

const parentPostIdx = postList.value.findIndex(p => p.id === post.parentId);
const isParentPostExist = parentPostIdx !== -1;
</script>
