<template>
  <article class="post-card">
    <!-- Post Type Badge -->
    <!-- <div v-if="post.type === 'reply'" class="post-type-badge">
      <svg class="icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9,17 4,12 9,7"/>
        <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
      </svg>
      답글
    </div> -->

    <!-- Deleted Notice -->
    <div
      v-if="!isParentPostExist && post.type === 'reply' && !isMypage"
      class="post-deleted-notice"
    >
      <svg
        class="icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
      원글이 삭제된 답글입니다
    </div>

    <!-- Card Header -->
    <header class="post-card-header">
      <div class="post-title-section">
        <h2 class="post-title">
          <router-link
            :to="{ name: 'board-detail', params: { id: post.id } }"
            class="post-link"
          >
            {{ post.type === 'reply' ? 'Re: ' + post.title : post.title }}
          </router-link>
        </h2>
        <div class="post-meta">
          <div class="author-info">
            <div class="avatar">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span class="author-name">{{ post.user.name }}</span>
          </div>
          <time class="post-date" :datetime="post.date">
            {{ formatDate(post.date) }}
          </time>
        </div>
      </div>
    </header>

    <!-- Card Content Preview -->
    <div class="post-card-content">
      <p class="post-preview">
        {{ getContentPreview(post.content) }}
      </p>
    </div>

    <!-- Card Footer with Stats -->
    <footer class="post-card-footer">
      <div class="post-stats">
        <div class="stat-item views">
          <svg
            class="stat-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span class="stat-number">{{ post.view }}</span>
        </div>
        <div class="stat-item likes">
          <svg
            class="stat-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
            />
          </svg>
          <span class="stat-number">{{ post.likes.length }}</span>
        </div>
        <div class="stat-item dislikes">
          <svg
            class="stat-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
            />
          </svg>
          <span class="stat-number">{{ post.dislikes.length }}</span>
        </div>
      </div>

      <!-- Read More Button -->
      <router-link
        :to="{ name: 'board-detail', params: { id: post.id } }"
        class="read-more-btn"
      >
        자세히 보기
        <svg
          class="icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </router-link>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { Post } from '@/types';
import { formatDate } from '@/utils';
import { usePost } from '@/composables';

const { postList } = usePost();
const { post, isMypage } = defineProps<{
  post: Post;
  isMypage?: boolean;
}>();

const parentPostIdx = postList.value.findIndex(p => p.id === post.parentId);
const isParentPostExist = parentPostIdx !== -1;

// 게시글 내용 미리보기 생성
const getContentPreview = (content: string): string => {
  if (!content) return '내용이 없습니다.';

  // HTML 태그 제거
  const textContent = content.replace(/<[^>]*>/g, '');

  // 최대 120자까지만 표시
  const maxLength = 120;
  if (textContent.length <= maxLength) {
    return textContent;
  }

  return textContent.substring(0, maxLength) + '...';
};
</script>
