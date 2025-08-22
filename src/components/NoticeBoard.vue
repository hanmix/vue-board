<template>
  <header class="header">
    <div class="header-content">
      <h1>공지게시판</h1>
      <div class="header-actions">
        <SearchFilter
          :boardType="boardType"
          :searchKeyword="searchKeyword"
          :searchType="searchType"
          :onSearch="setSearch"
        />
      </div>
    </div>
  </header>
  <section class="posts-section">
    <div v-if="loading" class="loading">로딩중...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="!posts.length" class="empty">게시글이 없습니다.</div>

    <div v-else v-for="post in posts" :key="post.id">
      <PostItem :post="post" />
    </div>
  </section>

  <section class="pagination-section">
    <Pagination
      v-if="totalPosts && !loading && !error"
      :currentPage="currentPage"
      :totalPage="lastPage"
      :onPageChange="goToPage"
    />
  </section>
</template>

<script setup lang="ts">
import SearchFilter from './SearchFilter.vue';
import Pagination from './Pagination.vue';
import PostItem from './PostItem.vue';
import { useBoardData } from '@/composables';
import { BoardType } from '@/types';

const boardType = BoardType.NOTICE;

const {
  posts,
  loading,
  error,
  currentPage,
  lastPage,
  totalPosts,
  searchKeyword,
  searchType,
  goToPage,
  setSearch,
} = useBoardData(boardType);
</script>
