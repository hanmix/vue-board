<template>
  <div class="board-container">
    <!-- 헤더 영역 -->
    <header class="header">
      <h1>게시글 목록</h1>
      <div class="logout">
        <button @click="userStore.logout">로그아웃</button>
      </div>
    </header>

    <!-- 검색/필터 영역 -->
    <section class="search-section">
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
    </section>

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

    <!-- 페이징 영역 -->
    <section class="pagination-section">
      <Pagination
        :currentPage="postStore.page"
        :totalPage="postStore.lastPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { usePostStore } from '@/stores/post';
import { useUserStore } from '@/stores/user';
import Pagination from '@/components/Pagination.vue';
import { formatDate } from '@/utils';
import { PaginationParams } from '@/types';

const postStore = usePostStore();
const userStore = useUserStore();

// 검색/필터 관련 상태
const filterType = ref('title');
const searchKeyword = ref('');

// 서버 기본값을 사용하도록, 페이지 번호가 있을 때만 추가
const fetchData = () => {
  const params: PaginationParams = {
    page: postStore.page,
    size: postStore.size,
    type: filterType.value,
    keyword: searchKeyword.value,
  };
  postStore.fetchPosts(params);
};

// 검색 시에는 첫 페이지부터 조회
const onSearch = () => {
  postStore.page = 1;
  fetchData();
};

// 이전 페이지 이동
const prevPage = async (): Promise<void> => {
  if (postStore.page > 1) {
    postStore.page--;
    fetchData();
  }
};

// 다음 페이지 이동 (현재 페이지가 마지막 페이지보다 작은 경우에만 호출)
const nextPage = async (): Promise<void> => {
  if (postStore.page < postStore.lastPage) {
    postStore.page++;
    fetchData();
  }
};

// NOTE: Life Cycle
onBeforeMount(() => {
  // 초기 조회: 서버에서 기본 page와 size 값으로 응답
  fetchData();
});
</script>

<style scoped>
.board-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.logout button {
  padding: 0.5rem 1rem;
}
.search-section {
  margin-bottom: 1rem;
}
.search-form {
  display: flex;
  gap: 0.5rem;
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
.pagination-section {
  display: flex;
  justify-content: center;
}
</style>
