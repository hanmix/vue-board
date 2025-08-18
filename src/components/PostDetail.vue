<template>
  <div v-if="currentPost" class="post-container">
    <div style="display: flex; justify-content: space-between">
      <h1 class="post-title">{{ currentPost.title }}</h1>
      <p
        v-if="parentPost?.isDeleted && currentPost.type === 'reply'"
        style="color: grey; font-size: 1.5rem"
      >
        {{ '원글이 삭제된 답글' }}
      </p>
      <div style="display: flex; gap: 10px">
        <button v-if="currentPost.userId === userId" @click="handleUpdate">
          수정
        </button>
        <button v-if="currentPost.userId === userId" @click="handleDelete">
          삭제
        </button>
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
    <div>
      <button @click="moveToPost('prev')">이전 글</button>
      <button @click="moveToPost('next')">다음 글</button>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script setup lang="ts">
import { usePost, useModal, useUser } from '@/composables';
import { formatDate } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const {
  prevPost,
  currentPost,
  nextPost,
  parentPost,
  fetchParentPostById,
  fetchPostById,
  createNewReply,
  updatePost,
  deletePost,
} = usePost();
const { userId } = useUser();
const { showAlert } = useModal();

const { id } = defineProps<{
  id: string;
}>();
const emit = defineEmits(['onUpdate']);
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

const handleFetchParentPostById = async () => {
  try {
    if (currentPost.value?.parentId) {
      await fetchParentPostById(currentPost.value.parentId);
    } else {
      return;
    }
  } catch (error) {
    console.error('handleFetchParentPostById 호출 에러:', error);
    throw error;
  }
};

const title = ref('답글 테스트 중 ... 제목 입니다.');
const content = ref('답글 테스트 중 ... 내용 입니다.');

const handleModal = async () => {
  if (typeof currentPost.value?.id === 'string') {
    title.value = `${currentPost.value.title}에 대한 ${title.value}`;
    const data = await createNewReply(
      currentPost.value.id,
      title.value,
      content.value
    );
    if (!data) return;
    showAlert('답글이 생성되었습니다.');
    router.push(`/board/detail/${data.id}`);
  }
};

const handleUpdate = async () => {
  if (typeof currentPost.value?.id === 'string') {
    title.value = '게시글 수정 테스트 중 -- 제목';
    content.value = '게시글 수정 테스트 중 -- 내용';
    await updatePost(currentPost.value.id, title.value, content.value);
    showAlert('게시글이 수정되었습니다.');
  }
};

const handleDelete = async () => {
  if (typeof currentPost.value?.id === 'string') {
    await deletePost(currentPost.value.id);
    showAlert('게시글이 삭제 되었습니다.');
    router.push('/board');
  }
};

const moveToPost = (type: 'prev' | 'next') => {
  if (type === 'prev' && prevPost.value) {
    router.push(`/board/detail/${prevPost.value.id}`);
  } else if (type === 'next' && nextPost.value) {
    router.push(`/board/detail/${nextPost.value.id}`);
  }
};

const setData = async () => {
  try {
    await handleFetchPostById();
    await handleFetchParentPostById();
  } catch (error) {
    console.error('setData 호출 에러:', error);
    showAlert('게시글을 불러오는 중 오류가 발생했습니다.');
  }
};

onMounted(async () => {
  await setData();
  console.log('parentPost', parentPost.value);
  console.log('currentPost', currentPost.value);
});
</script>
