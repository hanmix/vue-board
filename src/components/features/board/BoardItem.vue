<template>
  <article class="post-card modern-feed-item" @click="navigateToDetail">
    <!-- 삭제된 원글 알림 (최상단에 컴팩트하게) -->
    <div
      v-if="post.type === 'reply' && post.parentId && post.isParentDeleted && !isMypage"
      class="deleted-notice-banner"
    >
      ⚠️ 원글이 삭제된 답글
    </div>

    <!-- 메인 컨텐츠 (소셜 미디어 스타일) -->
    <div class="feed-content">
      <!-- 작성자 & 메타 정보 (상단) -->
      <header class="feed-header">
        <div class="author-section">
          <div class="author-avatar-mini">
            {{ post.user.name.charAt(0).toUpperCase() }}
          </div>
          <div class="author-meta">
            <span class="author-name">{{ post.user.name }}</span>
            <span class="post-metadata">
              <time :datetime="post.date" :title="formatDate(post.date)">
                {{ getRelativeTime(post.date) }}
              </time>
            </span>
          </div>
        </div>
        
        <!-- 답글 표시 (우상단) -->
        <div v-if="post.type === 'reply'" class="reply-indicator">
          <svg class="reply-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,17 4,12 9,7"/>
            <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
          </svg>
          <span class="reply-text">답글</span>
        </div>
      </header>

      <!-- 게시글 제목 (메인 컨텐츠) -->
      <main class="feed-body">
        <h2 class="post-title-feed">
          <router-link
            :to="{ name: 'board-detail', params: { id: post.id } }"
            class="post-link-feed"
            @click.stop
          >
            {{ post.title }}
          </router-link>
        </h2>
      </main>

      <!-- 인터랙션 바 (하단) -->
      <footer class="feed-interactions">
        <div class="interaction-stats">
          <button class="interaction-btn views" @click.stop>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{{ formatStatNumber(post.view) }}</span>
          </button>
          
          <button class="interaction-btn likes" @click.stop>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            <span>{{ formatStatNumber(post.likes.length) }}</span>
          </button>
          
          <button class="interaction-btn dislikes" @click.stop>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
            </svg>
            <span>{{ formatStatNumber(post.dislikes.length) }}</span>
          </button>
        </div>

        <!-- 읽기 액션 -->
        <router-link
          :to="{ name: 'board-detail', params: { id: post.id } }"
          class="read-action"
          @click.stop
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </router-link>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import { type ProcessedPost } from '@/types';
import { formatDate } from '@/utils';
import { useRouter } from 'vue-router';

const { post } = defineProps<{
  post: ProcessedPost;
  isMypage?: boolean;
}>();

const router = useRouter();

// 카드 클릭 시 상세 페이지로 이동
const navigateToDetail = () => {
  router.push({ name: 'board-detail', params: { id: post.id } });
};

// 상대 시간 표시 (소셜 미디어 스타일)
const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) return '방금 전';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
  
  return formatDate(dateString);
};

// 통계 숫자 포맷팅 (1K, 1M 등)
const formatStatNumber = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  return `${(num / 1000000).toFixed(1)}M`;
};
</script>