<template>
  <div class="board-container">
    <h1 class="header">게시글 목록</h1>
    <div class="logout">
      <button @click="userStore.logout">로그아웃</button>
    </div>
    <!-- 검색/필터 컨트롤 -->
    <form @submit.prevent="onSearch" class="search-form">
      <select v-model="filterType">
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="title_content">제목+내용</option>
        <option value="user">작성자</option>
      </select>
      <input type="text" v-model="searchKeyword" placeholder="검색어 입력" />
      <button type="submit">검색</button>
    </form>

    <!-- 로딩 및 에러 상태 -->
    <div v-if="postStore.loading" class="loading">로딩중...</div>
    <div v-if="postStore.error" class="error">{{ postStore.error }}</div>

    <!-- 게시글 리스트 렌더링 -->
    <ul v-if="!postStore.loading && postStore.posts.length" class="post-list">
      <li v-for="post in postStore.posts" :key="post.id" class="post-item">
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
          <span>좋아요: {{ post.likes }}</span>
          <span>싫어요: {{ post.dislikes }}</span>
        </div>
      </li>
    </ul>
    <div
      v-else-if="!postStore.loading && !postStore.posts.length"
      class="empty"
    >
      게시글이 없습니다.
    </div>

    <!-- Pagination 컴포넌트 -->
    <Pagination
      :currentPage="postStore.page"
      :totalPage="postStore.totalPosts"
      @prevPage="prevPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted, onUpdated } from 'vue';
import { usePostStore, useUserStore } from '@/stores';
import { formatDate } from '@/utils';
import Pagination from '@/components/Pagination.vue';

const postStore = usePostStore();
const userStore = useUserStore();

// 페이징, 검색, 필터 상태
const filterType = ref('title');
const searchKeyword = ref('');

const prevPage = () => {
  if (postStore.page > 1) {
    postStore.page--;
  }
};

const nextPage = () => {
  if (postStore.page < postStore.totalPosts) {
    postStore.page++;
  }
};

const loadPosts = async () => {
  postStore.fetchPosts;
};

const onSearch = () => {
  postStore.page = 1;
  loadPosts();
};

// onBeforeMount(() => loadPosts());
onMounted(() => loadPosts);
</script>

<style scoped>
.board-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  color: #f0f0f0;
}

.header {
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.search-form {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
}

.search-form select,
.search-form input {
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: #f0f0f0;
}

.search-form button {
  padding: 0.5rem 1rem;
  background-color: #2c3e50; /* 변경된 색상 */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-form button:hover {
  background-color: #34495e; /* 호버 시 색상 */
}

.loading,
.error,
.empty {
  text-align: center;
  margin: 1rem 0;
  font-size: 1.1rem;
}

.error {
  color: #ff6b6b;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  background: #2c2c2c;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.post-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.post-title {
  margin: 0;
  font-size: 1.4rem;
  color: #ffffff;
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #aaa;
  margin-top: 0.3rem;
}

.post-content {
  margin: 0.8rem 0;
  line-height: 1.6;
  color: #ccc;
}

.post-stats {
  font-size: 0.85rem;
  color: #bbb;
  display: flex;
  gap: 1rem;
  border-top: 1px solid #444;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}
</style>
