<template>
  <div class="board-list">
    <VLoadingSpinner
      v-if="loading"
      size="md"
      message="공지사항을 불러오는 중..."
      class="centered-state"
    />

    <VErrorMessage
      v-else-if="error"
      :message="error"
      title="공지사항을 불러올 수 없습니다"
      severity="error"
      class="centered-state"
    />

    <div v-else-if="!posts.length" class="empty-state centered-state">
      게시글이 없습니다.
    </div>

    <div v-else class="posts-list">
      <BoardItem v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <Pagination
      v-if="totalPosts && !loading && !error"
      :currentPage="currentPage"
      :totalPage="lastPage"
      :onPageChange="goToPage"
      class="pagination"
    />
  </div>
</template>

<script setup lang="ts">
import { Pagination } from '@/components/ui';
import BoardItem from './BoardItem.vue';
import { useBoardData } from '@/composables';
import { BoardType } from '@/types';
import { VLoadingSpinner, VErrorMessage } from '@/design-system/components';

const boardType = BoardType.NOTICE;

const { posts, loading, error, currentPage, lastPage, totalPosts, goToPage } =
  useBoardData(boardType);
</script>
