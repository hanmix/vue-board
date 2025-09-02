<template>
  <VCard
    variant="elevated"
    padding="md"
    class="board-item-card"
    @click="navigateToDetail"
  >
    <!-- 삭제된 원글 알림 -->
    <VCard
      v-if="
        post.type === 'reply' &&
        post.parentId &&
        post.isParentDeleted &&
        !isMypage
      "
      variant="outlined"
      padding="sm"
      class="deleted-parent-alert"
    >
      <div class="alert-content">
        <div class="alert-icon">⚠️</div>
        <span class="alert-text">원글이 삭제된 답글</span>
      </div>
    </VCard>

    <!-- 메인 컨텐츠 -->
    <article class="post-content">
      <!-- 헤더: 작성자 정보 및 메타데이터 -->
      <header class="post-header">
        <div class="author-section">
          <div class="author-avatar">
            {{ post.user.name.charAt(0).toUpperCase() }}
          </div>
          <div class="author-info">
            <h3 class="author-name">{{ post.user.name }}</h3>
            <time
              class="post-time"
              :datetime="post.date"
              :title="formatDate(post.date)"
            >
              {{ getRelativeTime(post.date) }}
            </time>
          </div>
        </div>

        <!-- 답글 표시 -->
        <div v-if="post.type === 'reply'" class="reply-badge">
          {{ post.type.toUpperCase() }}
        </div>
      </header>

      <!-- 게시글 제목 -->
      <main class="post-body">
        <h2 class="post-title">
          <router-link
            :to="{
              name: 'board-detail',
              params: { id: props.post.id },
              query: { from: detectedBoardType },
            }"
            class="post-link"
            @click.stop
          >
            {{ post.title }}
          </router-link>
        </h2>
      </main>

      <!-- 인터랙션 바 -->
      <footer class="item-footer">
        <div class="interaction-stats">
          <VIcon name="eye" size="sm" class="stat-icon" />
          <span class="stat-count">{{ formatStatNumber(post.view) }}</span>
        </div>
        <div class="interaction-stats">
          <VIcon name="thumbs-up" size="sm" class="stat-icon" />
          <span class="stat-count">{{
            formatStatNumber(post.likes.length)
          }}</span>
        </div>

        <div class="interaction-stats">
          <VIcon name="thumbs-down" size="sm" class="stat-icon" />
          <span class="stat-count">{{
            formatStatNumber(post.dislikes.length)
          }}</span>
        </div>

        <!-- 읽기 버튼 -->
        <!-- <VButton
          variant="ghost"
          size="sm"
          class="read-button"
          @click.stop="navigateToDetail"
        >
          <span class="sr-only">게시글 보기</span>
          <VIcon name="chevron-right" size="xs" class="read-icon" />
        </VButton> -->
      </footer>
    </article>
  </VCard>
</template>

<script setup lang="ts">
import { type ProcessedPost, BoardType } from '@/types';
import { formatDate } from '@/utils';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import { VCard, VIcon } from '@/design-system/components';
import './BoardItem.css';

const props = defineProps<{
  post: ProcessedPost;
  isMypage?: boolean;
  boardType?: BoardType; // 선택적 prop (하위 호환성)
}>();

const router = useRouter();
const route = useRoute();

// 캡슐화된 boardType 자동 감지 로직
const detectedBoardType = computed((): BoardType => {
  if (props.boardType) {
    return props.boardType;
  }

  if (props.post.board) {
    switch (props.post.board) {
      case 'notice':
      case BoardType.NOTICE:
        return BoardType.NOTICE;
      case 'free':
      case BoardType.FREE:
        return BoardType.FREE;
      default:
        break;
    }
  }

  if (route.path.includes('/board/notice')) {
    return BoardType.NOTICE;
  } else if (route.path.includes('/board/free')) {
    return BoardType.FREE;
  }

  // 기본값
  return BoardType.FREE;
});

// 카드 클릭 시 상세 페이지로 이동
const navigateToDetail = () => {
  const query = { from: detectedBoardType.value };
  router.push({
    name: 'board-detail',
    params: { id: props.post.id },
    query,
  });
};

// 상대 시간 표시 (소셜 미디어 스타일)
const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금 전';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}일 전`;

  return formatDate(dateString);
};

// 통계 숫자 포맷팅 (1K, 1M 등)
const formatStatNumber = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  return `${(num / 1000000).toFixed(1)}M`;
};
</script>
