<template>
  <VContainer v-if="currentPost" class="board-detail-container">
    <!-- 삭제된 원글 알림 -->
    <VCard
      v-if="parentPost?.isDeleted && currentPost.type === 'reply'"
      variant="outlined"
      padding="md"
      class="deleted-parent-notice"
    >
      <div class="notice-icon">⚠️</div>
      <span class="notice-text">원글이 삭제된 답글입니다</span>
    </VCard>

    <!-- 메인 게시글 카드 -->
    <VCard variant="elevated" padding="lg" class="board-detail-main-card">
      <article role="article" :aria-label="`게시글: ${currentPost.title}`">
        <!-- 게시글 헤더 -->
        <header class="board-detail-header">
          <div class="board-detail-actions">
            <div v-if="currentPost.type === 'reply'" class="reply-badge">
              <span class="reply-indicator">REPLY</span>
            </div>
            <!-- 액션 버튼들 -->
            <div
              v-if="currentPost.userId === userId"
              class="board-detail-buttons"
            >
              <VButton
                variant="ghost"
                size="sm"
                @click="handleUpdate"
                :aria-label="`게시글 '${currentPost.title}' 수정`"
              >
                <VIcon name="edit" size="sm" />
                <p class="edit-text">수정</p>
              </VButton>

              <VButton
                variant="ghost"
                size="sm"
                @click="handleDelete"
                :aria-label="`게시글 '${currentPost.title}' 삭제`"
                class="delete-button"
              >
                <VIcon name="trash" size="sm" />
                <p class="delete-text">삭제</p>
              </VButton>
            </div>
          </div>

          <h1 class="board-detail-title">{{ currentPost.title }}</h1>
        </header>

        <!-- 작성자 정보 -->
        <div class="board-detail-author">
          <div class="author-avatar">
            {{ currentPost.user.name.charAt(0).toUpperCase() }}
          </div>
          <div class="author-details">
            <div class="author-name">{{ currentPost.user.name }}</div>
            <time class="post-date" :datetime="currentPost.date">
              {{ formatDate(currentPost.date) }}
            </time>
          </div>
        </div>

        <!-- 게시글 내용 -->
        <div class="board-detail-content">
          {{ currentPost.content }}
        </div>

        <!-- 게시글 푸터 -->
        <footer class="board-detail-footer">
          <div class="board-detail-stats">
            <div class="stat-item">
              <VIcon name="eye" size="sm" />
              {{ currentPost.view.toLocaleString() }}
            </div>
            <div class="stat-item">
              <VIcon name="thumbs-up" size="sm" />
              {{ currentPost.likes.length }}
            </div>
            <div class="stat-item">
              <VIcon name="thumbs-down" size="sm" />
              {{ currentPost.dislikes.length }}
            </div>
          </div>

          <VButton
            variant="secondary"
            size="sm"
            @click="handleModal"
            :aria-label="`게시글 '${currentPost.title}'에 답글 작성`"
            class="board-detail-reply-button"
          >
            <VIcon name="message-circle" size="sm" />
            답글 쓰기
          </VButton>
        </footer>
      </article>
    </VCard>

    <!-- 게시글 네비게이션 -->
    <nav
      v-if="prevPost?.id || nextPost?.id"
      class="board-detail-navigation"
      :class="navigationClass"
    >
      <VButton
        v-if="prevPost?.id"
        variant="ghost"
        size="sm"
        @click="moveToPost('prev')"
        class="nav-button prev-button"
      >
        <VIcon name="chevron-left" size="sm" aria-label="이전 글로 이동" />
        <span class="nav-title board-detail-desktop-only">
          {{ truncateTitle(prevPost.title) }}
        </span>
        <span class="nav-label board-detail-mobile-only">이전 글</span>
      </VButton>

      <VButton
        v-if="nextPost?.id"
        variant="ghost"
        size="sm"
        @click="moveToPost('next')"
        class="nav-button next-button"
      >
        <span class="nav-title board-detail-desktop-only">{{
          truncateTitle(nextPost.title)
        }}</span>
        <span class="nav-label board-detail-mobile-only">다음 글</span>
        <VIcon name="chevron-right" size="sm" aria-label="다음 글로 이동" />
      </VButton>
    </nav>
  </VContainer>

  <!-- 로딩 상태 -->
  <VContainer v-else class="loading-container">
    <VLoadingSpinner size="lg" message="게시글을 불러오는 중..." />
  </VContainer>
</template>

<script setup lang="ts">
import './BoardDetail.css';
import { usePost, useUser } from '@/composables';
import { formatDate } from '@/utils';
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '@/design-system/composables';
import {
  VContainer,
  VCard,
  VButton,
  VIcon,
  VLoadingSpinner,
} from '@/design-system/components';
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
const { showSuccess, showError } = useToast();

const { id } = defineProps<{
  id: string;
}>();
const emit = defineEmits(['onUpdate']);
const router = useRouter();

const handleFetchPostById = async () => {
  await fetchPostById(id);
};

const handleFetchParentPostById = async () => {
  if (
    currentPost.value &&
    currentPost.value.type === 'reply' &&
    typeof currentPost.value.parentId === 'string'
  ) {
    await fetchParentPostById(currentPost.value.parentId);
  }
};

const title = ref('');
const content = ref('답글 내용 테스트');
const handleModal = async () => {
  title.value = '답글 제목 테스트 중';
  const data = await createNewReply(
    currentPost.value?.id as string,
    title.value,
    content.value
  );
  if (!data) return;
  showSuccess('답글이 생성되었습니다.');
  router.push(`/board/detail/${data.id}`);
};

const handleUpdate = async () => {
  if (typeof currentPost.value?.id === 'string') {
    title.value = '게시글 수정 테스트 중 -- 제목';
    content.value = '게시글 수정 테스트 중 -- 내용';
    await updatePost(currentPost.value.id, title.value, content.value);
    showSuccess('게시글이 수정되었습니다.');
  }
};

const handleDelete = async () => {
  if (typeof currentPost.value?.id === 'string') {
    await deletePost(currentPost.value.id);
    showSuccess('게시글이 삭제되었습니다.');
    router.push('/board');
  }
};

const setData = async () => {
  try {
    await handleFetchPostById();
    await handleFetchParentPostById();
  } catch (error) {
    console.error('setData 호출 에러:', error);
    showError('게시글을 불러오는 중 오류가 발생했습니다.');
  }
};

// 네비게이션 버튼 배치 계산
const navigationClass = computed(() => {
  const hasPrev = !!prevPost.value?.id;
  const hasNext = !!nextPost.value?.id;

  if (hasPrev && hasNext) return 'nav-both';
  if (hasPrev && !hasNext) return 'nav-prev-only';
  if (!hasPrev && hasNext) return 'nav-next-only';
  return '';
});

// 제목 자르기 (UI 최적화)
const truncateTitle = (title: string, maxLength = 30) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};

// 네비게이션 이동
const moveToPost = (direction: 'prev' | 'next') => {
  const post = direction === 'prev' ? prevPost.value : nextPost.value;
  const boardType = post?.board || 'free';
  const query = { from: boardType };
  if (post?.id) {
    router.push({
      name: 'board-detail',
      params: { id: post.id },
      query,
    });
  }
};

watch(
  () => id,
  async newId => {
    if (newId) {
      await setData();
    }
  }
);

onMounted(() => {
  setData();
});
</script>
