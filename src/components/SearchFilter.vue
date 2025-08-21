<template>
  <div class="search-filter-container">
    <form class="search-form" @submit.prevent="handleSearch">
      <div class="search-input-group">
        <select
          id="search-type"
          name="searchType"
          class="form-element search-select"
          v-model="searchType"
        >
          <option
            v-for="option in searchOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <div class="search-input-wrapper">
          <input
            id="search-keyword"
            name="searchKeyword"
            type="text"
            class="form-element search-input"
            v-model="searchKeyword"
            placeholder="검색어를 입력하세요..."
          />
          <button type="submit" class="search-button" :disabled="!searchKeyword?.trim()">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { usePagination, usePost, useModal } from '@/composables';
import { BoardType } from '@/types';

const { searchOptions, onSearch } = usePagination();
const { searchKeyword, searchType } = usePost();
const { showAlert } = useModal();

const { boardType } = defineProps<{
  boardType: BoardType;
}>();

const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    showAlert('검색어를 입력해주세요.');
  }
  onSearch(boardType);
};
</script>
