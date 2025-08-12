<template>
  <div v-if="currentPost" class="post-container">
    <div style="display: flex; justify-content: space-between">
      <h1 class="post-title">{{ currentPost.title }}</h1>
      <div>
        <button @click="handleUpdate">수정</button>
        <button @click="handleDelete">삭제</button>
        <button v-if="currentPost.type === 'post'" @click="handleModal">
          답글 쓰기
        </button>
      </div>
    </div>
    <div class="post-meta">
      <span>작성자: {{ currentPost.user.name }}</span>
      <span>작성일: {{ formatDate(currentPost.date) }}</span>
    </div>
    <div class="post-content">{{ currentPost.content }}</div>
    <div class="post-stats">
      <span>조회수: {{ currentPost.view }}</span>
      <span>좋아요: {{ currentPost.likes.length }}</span>
      <span>싫어요: {{ currentPost.dislikes.length }}</span>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script setup lang="ts">
import { usePost } from '@/composables';
import { formatDate } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const { createNewReply, updatePost } = usePost();

const { id } = defineProps<{
  id: string;
}>();
const emit = defineEmits(['onUpdate']);

const { currentPost, fetchPostById } = usePost();
const router = useRouter();

const handleFetchPostById = async () => {
  try {
    if (!id) return;
    await fetchPostById(id);
  } catch (error) {
    console.error('handleFetchPostById 호출 에러:', error);
    throw error;
  }
};

const title = ref('답글 테스트 중 ... 제목 입니다.');
const content = ref('답글 테스트 중 ... 내용 입니다.');

const handleModal = async () => {
  title.value = `${currentPost.value?.title}에 대한 ${title.value}`;
  const data = await createNewReply(
    currentPost.value?.id ?? '',
    title.value,
    content.value
  );
  if (!data) return;
  router.push(`/board/detail/${data?.id}`);
};

const handleUpdate = async () => {
  title.value = '게시글 수정 테스트 중 -- 제목';
  content.value = '게시글 수정 테스트 중 -- 내용';
  await updatePost(currentPost.value?.id ?? '', title.value, content.value);
};

const handleDelete = async () => {};

onMounted(async () => {
  await handleFetchPostById();
});
</script>
