<template>
  <div>
    <h1>게시글 목록</h1>
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
    <div v-if="postStore.loading">로딩중...</div>
    <div v-if="postStore.error" class="error">{{ postStore.error }}</div>

    <!-- 게시글 리스트 렌더링 -->
    <ul v-if="!postStore.loading && postStore.posts.length">
      <li v-for="post in postStore.posts" :key="post.id" class="post-item">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <div class="meta">
          <span>작성자: {{ post.user.name }}</span> |
          <span>작성일: {{ post.createdAt }}</span>
        </div>
        <div class="stats">
          <span>조회수: {{ post.viewCount }}</span> |
          <span>좋아요: {{ post.likeCount }}</span> |
          <span>싫어요: {{ post.dislikeCount }}</span>
        </div>
      </li>
    </ul>
    <div v-else-if="!postStore.loading && !postStore.posts.length">
      게시글이 없습니다.
    </div>

    <!-- 페이징 컨트롤: 전체 페이지가 1 이상일 때 보임 -->
    <div v-if="totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        다음
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { usePostStore } from '@/stores';

const postStore = usePostStore();

// 페이징, 검색, 필터 상태
const currentPage = ref(1);
const pageSize = ref(10);
const filterType = ref('title');
const searchKeyword = ref('');

// totalPages 계산 시 최소 1페이지를 보장 (게시글이 없을 경우에도 1페이지로 간주)
const totalPages = computed(() => {
  const pages = Math.ceil(postStore.totalPosts / pageSize.value);
  return pages > 0 ? pages : 1;
});

const loadPosts = () => {
  postStore.fetchPosts(
    currentPage.value,
    pageSize.value,
    filterType.value,
    searchKeyword.value
  );
};

const onSearch = () => {
  currentPage.value = 1;
  loadPosts();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadPosts();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadPosts();
  }
};

onMounted(() => loadPosts());
</script>

<style scoped>
.search-form {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error {
  color: red;
  margin: 0.5rem 0;
}

.post-item {
  border-bottom: 1px solid #ddd;
  padding: 1rem 0;
}

.meta,
.stats {
  font-size: 0.9rem;
  color: #555;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
