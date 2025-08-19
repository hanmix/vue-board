<template>
  <div class="header">
    <h1>마이페이지</h1>
    <div v-if="currentUser">
      내 정보
      <li>id: {{ currentUser.id }}</li>
      <li>email: {{ currentUser.email }}</li>
      <li>name: {{ currentUser.name }}</li>
    </div>
  </div>

  <section class="posts-section">
    <div v-if="loading" class="loading">로딩중...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="!postList.length" class="empty">게시글이 없습니다.</div>

    <div v-else v-for="post in filteredPosts" :key="post.id">
      <PostItem :post="post" :isMypage="isMypage" />
    </div>
  </section>

  <section class="pagination-section">
    <Pagination
      v-if="totalPosts && !loading && !error"
      :currentPage="page"
      :totalPage="lastPage"
    />
  </section>
</template>
<script setup lang="ts">
import { usePost, useUser } from '@/composables';
import { computed, onMounted, watch } from 'vue';
import PostItem from './PostItem.vue';
import Pagination from './Pagination.vue';

const {
  totalPosts,
  page,
  lastPage,
  postList,
  loading,
  error,
  isMypage,
  fetchMyPosts,
} = usePost();
const { currentUser, getUserById } = useUser();

const filteredPosts = computed(() =>
  postList.value.filter(post => !post.isDeleted)
);

watch(
  page,
  () => {
    fetchMyPosts();
  },
  {
    immediate: true,
  }
);

onMounted(async () => {
  await getUserById();
});
</script>
