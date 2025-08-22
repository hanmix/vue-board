<template>
  <!-- 메인 게시글 카드 -->
  <article 
    v-if="currentPost" 
    class="post-detail-container"
    role="article"
    :aria-label="`게시글: ${currentPost.title}`"
  >
    <!-- 삭제된 원글 알림 -->
    <div 
      v-if="parentPost?.isDeleted && currentPost.type === 'reply'"
      class="deleted-parent-notice"
      role="alert"
      aria-live="polite"
    >
      <div class="notice-icon" aria-hidden="true">⚠️</div>
      <span>원글이 삭제된 답글입니다</span>
    </div>

    <!-- 게시글 헤더 -->
    <header class="post-header">
      <div class="header-top">
        <div class="title-section">
          <div class="post-type-indicator">
            <span v-if="currentPost.type === 'reply'" class="reply-badge" aria-label="답글">Re:</span>
            <span v-else class="reply-badge-placeholder" aria-hidden="true"></span>
          </div>
          
          <h1 class="post-title" id="post-title">
            {{ currentPost.title }}
          </h1>
        </div>
        
        <!-- 개인 액션 버튼들 (수정/삭제만) -->
        <div class="header-actions" v-if="currentPost.userId === userId">
          <div class="action-buttons">
            <button 
              class="action-button edit-button"
              @click="handleUpdate"
              :aria-label="`게시글 '${currentPost.title}' 수정`"
            >
              <span class="button-icon" aria-hidden="true">✏️</span>
              <span>수정</span>
            </button>
            
            <button 
              class="action-button delete-button"
              @click="handleDelete"
              :aria-label="`게시글 '${currentPost.title}' 삭제`"
            >
              <span class="button-icon" aria-hidden="true">🗑️</span>
              <span>삭제</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 작성자 정보 섹션 -->
    <section class="post-author-section">
      <div class="author-info">
        <div class="author-avatar" :aria-label="`작성자 ${currentPost.user.name}`">
          {{ currentPost.user.name.charAt(0).toUpperCase() }}
        </div>
        <div class="author-details">
          <span class="author-name">{{ currentPost.user.name }}</span>
          <time 
            class="post-date" 
            :datetime="currentPost.date"
            :title="`작성일: ${formatDate(currentPost.date)}`"
          >
            {{ formatDate(currentPost.date) }}
          </time>
        </div>
      </div>
    </section>

    <!-- 게시글 내용 -->
    <main class="post-content-section">
      <div 
        class="post-content" 
        role="main"
        aria-labelledby="post-title"
      >
        {{ currentPost.content }}
      </div>
    </main>

    <!-- 통계 및 네비게이션 푸터 -->
    <footer class="post-footer">
      <!-- 통계 정보 및 답글 버튼 -->
      <div class="post-stats-section">
        <div class="post-stats-footer">
          <div class="stat-item views" title="조회수">
            <svg
              class="stat-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span class="stat-number">{{ currentPost.view.toLocaleString() }}</span>
          </div>
          <div class="stat-item likes" title="좋아요">
            <svg
              class="stat-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
              />
            </svg>
            <span class="stat-number">{{ currentPost.likes.length }}</span>
          </div>
          <div class="stat-item dislikes" title="싫어요">
            <svg
              class="stat-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
              />
            </svg>
            <span class="stat-number">{{ currentPost.dislikes.length }}</span>
          </div>
        </div>
        
        <!-- 답글 버튼 -->
        <div class="reply-action" v-if="currentPost.type === 'post'">
          <button 
            class="action-button reply-button"
            @click="handleModal"
            :aria-label="`게시글 '${currentPost.title}'에 답글 작성`"
          >
            <span class="button-icon" aria-hidden="true">💬</span>
            <span>답글 쓰기</span>
          </button>
        </div>
      </div>

      <!-- 네비게이션 -->
      <nav class="post-navigation" :style="{ justifyContent: navigationJustify }" aria-label="게시글 네비게이션">
        <button 
          v-if="prevPost?.id" 
          class="nav-button prev-button"
          @click="moveToPost('prev')"
          :aria-label="`이전 게시글: ${prevPost.title}`"
          :title="prevPost.title"
        >
          <span class="nav-icon" aria-hidden="true">←</span>
          <div class="nav-content">
            <span class="nav-label">이전 글</span>
            <span class="nav-title">{{ truncateTitle(prevPost.title) }}</span>
          </div>
        </button>
        
        <button 
          v-if="nextPost?.id" 
          class="nav-button next-button"
          @click="moveToPost('next')"
          :aria-label="`다음 게시글: ${nextPost.title}`"
          :title="nextPost.title"
        >
          <div class="nav-content">
            <span class="nav-label">다음 글</span>
            <span class="nav-title">{{ truncateTitle(nextPost.title) }}</span>
          </div>
          <span class="nav-icon" aria-hidden="true">→</span>
        </button>
      </nav>
    </footer>
  </article>

  <!-- 로딩 상태 -->
  <div v-else class="loading-container" role="status" aria-label="게시글 로딩 중">
    <div class="loading-spinner" aria-hidden="true"></div>
    <span class="loading-text">게시글을 불러오는 중...</span>
  </div>
</template>

<script setup lang="ts">
import { usePost, useModal, useUser } from '@/composables';
import { formatDate } from '@/utils';
import { onMounted, ref, computed } from 'vue';
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

// 네비게이션 버튼 배치 계산
const navigationJustify = computed(() => {
  const hasPrev = !!prevPost.value?.id;
  const hasNext = !!nextPost.value?.id;
  
  if (hasPrev && hasNext) return 'space-between';
  if (hasPrev) return 'flex-start'; 
  if (hasNext) return 'flex-end';
  return 'center';
});

// 제목 자르기 유틸리티 함수
const truncateTitle = (title: string, maxLength: number = 30): string => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};

onMounted(async () => {
  await setData();
});
</script>
