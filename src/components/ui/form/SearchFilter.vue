<template>
  <div class="search-filter">
    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-input-group">
        <!-- 검색 타입 드롭다운 -->
        <VDropdown
          placement="bottom-start"
          size="sm"
          :aria-label="'검색 타입 선택'"
        >
          <template #trigger="{ isOpen }">
            <button
              type="button"
              class="search-type-trigger"
              :class="{ 'search-type-trigger--open': isOpen }"
            >
              {{ currentSearchLabel }}
              <VIcon
                name="chevron-down"
                size="xs"
                :class="[
                  'search-type-arrow',
                  { 'search-type-arrow--open': isOpen },
                ]"
              />
            </button>
          </template>

          <template #menu="{ close }">
            <VDropdownItem
              v-for="option in searchOptions"
              :key="option.value"
              :active="localSearchType === option.value"
              @click="selectSearchType(option.value, close)"
            >
              {{ option.label }}
            </VDropdownItem>
          </template>
        </VDropdown>

        <input
          v-model="localSearchKeyword"
          type="text"
          class="search-input"
          :placeholder="`${currentSearchLabel}(으)로 검색`"
          @keyup.enter="handleSearch"
        />

        <!-- 검색 버튼 -->
        <VButton
          variant="primary"
          size="sm"
          type="submit"
          class="search-button"
          :aria-label="'검색'"
        >
          <VIcon name="search" size="sm" />
        </VButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  VDropdown,
  VDropdownItem,
  VButton,
  VIcon,
} from '@/design-system/components/base';
import '/src/assets/styles/components/ui/form/SearchFilter.css';
import type { SearchType, BoardType } from '@/types';

interface Props {
  boardType: BoardType;
  searchKeyword: string;
  searchType: SearchType;
  onSearch: (keyword: string, type: SearchType) => void;
}

const props = defineProps<Props>();

// 검색 옵션들
const searchOptions = [
  { value: 'title' as SearchType, label: '제목' },
  { value: 'content' as SearchType, label: '내용' },
  { value: 'title_content' as SearchType, label: '제목+내용' },
  { value: 'user' as SearchType, label: '작성자' },
];

// 로컬 상태 관리
const localSearchKeyword = ref(props.searchKeyword);
const localSearchType = ref(props.searchType);

// 현재 검색 타입 라벨
const currentSearchLabel = computed(() => {
  return (
    searchOptions.find(option => option.value === localSearchType.value)
      ?.label || '제목'
  );
});

// 검색 타입 선택
const selectSearchType = (type: SearchType, closeDropdown: () => void) => {
  localSearchType.value = type;
  closeDropdown();
  // 검색 타입 변경 시 즉시 검색 실행
  if (localSearchKeyword.value.trim()) {
    handleSearch();
  }
};

// 검색 실행
const handleSearch = () => {
  const keyword = localSearchKeyword.value.trim();
  props.onSearch(keyword, localSearchType.value);
};
</script>
