<template>
  <!-- 게시글 리스트 영역 -->
  <section class="posts-section">
    <div v-if="postStore.loading" class="loading">로딩중...</div>
    <div v-if="postStore.error" class="error">{{ postStore.error }}</div>
    <ul
      v-if="!postStore.loading && postStore.postList.length"
      class="post-list"
    >
      <li v-for="post in postStore.postList" :key="post.id" class="post-item">
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
    <div
      v-else-if="!postStore.loading && !postStore.postList.length"
      class="empty"
    >
      게시글이 없습니다.
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { usePostStore } from '@/stores';
import { formatDate } from '@/utils';

const postStore = usePostStore();

// NOTE: Life Cycle
onBeforeMount(() => {
  postStore.fetchPosts();
});
</script>

<style scoped>
.post-item span {
  padding-inline: 5px;
}
.posts-section {
  margin-bottom: 1rem;
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
.loading,
.error,
.empty {
  text-align: center;
  margin: 1rem 0;
}
</style>
