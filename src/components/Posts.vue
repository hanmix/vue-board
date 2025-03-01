<template>
  <div class="post-container">
    <h1>게시글 목록</h1>
    <input v-model="postStore.params.keyword" placeholder="검색어 입력" />
    <select v-model="postStore.params.type">
      <option v-for="type in searchTypes" :key="type" :value="type">
        {{
          type === 'title' ? '제목' : type === 'content' ? '내용' : '제목+내용'
        }}
      </option>
    </select>
    <ul v-for="post in postStore.posts" :key="post.id" class="post">
      <div v-if="post.type === 'post'">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-content">{{ post.content }}</p>
      </div>
    </ul>
  </div>
  <Pagination
    :page="postStore.pagination.page"
    :last-page="postStore.pagination.lastPage"
    @update:page="postStore.params.page = $event"
  />
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/post';
import Pagination from './Pagination.vue';
import { SearchType } from '@/types';

const postStore = usePostStore();
const searchTypes: SearchType[] = ['title', 'content', 'title_content'];
</script>

<style scoped>
.post-container {
  display: grid;
  justify-content: center;
  align-items: center;
}

.post {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.post-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.post-content {
  font-size: 1em;
  color: #ddd;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  font-size: 1em;
  cursor: pointer;
}

.pagination span {
  font-size: 1em;
}
</style>
