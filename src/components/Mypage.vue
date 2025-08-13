<template>
  <div class="header">
    <h1>마이페이지</h1>
    <div>
      내 정보
      <li>id: {{ currentUser?.id }}</li>
      <li>email: {{ currentUser?.email }}</li>
      <li>name: {{ currentUser?.name }}</li>
    </div>
    <select v-model="selectedOption" class="form-element">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>

  <section class="posts-section">
    <div v-if="loading" class="loading">로딩중...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="!postList.length" class="empty">게시글이 없습니다.</div>

    <div v-else v-for="post in filteredPosts" :key="post.id">
      <PostItem v-if="post.type === selectedOption" :post="post" />
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
import { computed, onMounted, ref, watch } from 'vue';
import PostItem from './PostItem.vue';
import Pagination from './Pagination.vue';

const { totalPosts, page, lastPage, postList, loading, error, fetchMyPosts } =
  usePost();
const { currentUser, userId, getUserById } = useUser();

const filteredPosts = computed(() =>
  postList.value.filter(post => post.type === selectedOption.value)
);

type selectOptions = { label: string; value: string };
const selectedOption = ref('post');
const options: selectOptions[] = [
  { label: '내가 작성한 게시글', value: 'post' },
  { label: '내가 작성한 답글', value: 'reply' },
];

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
  await getUserById(userId.value ?? '');
});
</script>
