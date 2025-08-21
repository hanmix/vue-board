<template>
  <div class="header mypage-header">
    <h1>마이페이지</h1>
    <button @click="handleLogout" class="logout-btn">로그아웃</button>
  </div>

  <section class="userInfo-section">
    <div v-if="currentUserFromAuth || currentUser">
      <h2>내 정보</h2>
      <ul>
        <li>id: {{ currentUserFromAuth?.id || currentUser?.id }}</li>
        <li v-if="currentUser?.email">email: {{ currentUser.email }}</li>
        <li v-if="currentUser?.name">name: {{ currentUser.name }}</li>
      </ul>
    </div>
  </section>

  <section class="posts-section">
    <header class="header">
      <h2>내 게시글</h2>
    </header>
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
import { usePost, useUser, useAuth } from '@/composables';
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
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
const { logout, getCurrentUser } = useAuth();
const router = useRouter();

const currentUserFromAuth = computed(() => getCurrentUser());

const filteredPosts = computed(() =>
  postList.value.filter(post => !post.isDeleted)
);

const setData = async () => {
  // JWT에서 기본 정보를 우선 사용하고, 추가 정보가 필요하면 API 호출
  if (currentUserFromAuth.value?.id) {
    await getUserById();
  }
};

watch(
  page,
  async () => {
    await fetchMyPosts();
  },
  {
    immediate: true,
  }
);

function handleLogout() {
  const confirmed = confirm('정말 로그아웃 하시겠습니까?');
  if (!confirmed) return;
  logout();
  router.push('/signIn');
}

onMounted(async () => {
  await setData();
});
</script>
