<template>
  <div class="search-filter">
    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-input-group">
        <!-- 검색 타입 드롭다운 -->
        <VDropdown
          :id="DROPDOWN_IDS.SEARCH_FILTER"
          placement="bottom-start"
          size="sm"
          :vertical-offset="16"
          :aria-label="'검색 타입 선택'"
        >
          <template #trigger="{ isOpen }">
            <div
              class="search-type-trigger"
              :class="{ 'search-type-trigger--open': isOpen }"
              role="button"
              tabindex="0"
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
            </div>
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
          size="lg"
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
import { useRoute, useRouter } from 'vue-router';
import {
  VDropdown,
  VDropdownItem,
  VButton,
  VIcon,
} from '@/design-system/components/base';
import './SearchFilter.css';
import type { SearchType, BoardType } from '@/types';
import { getBoardRouteName } from '@/types/navigate';
import { DROPDOWN_IDS } from '@/types/dropdown';

interface Props {
  boardType: BoardType;
  searchKeyword: string;
  searchType: SearchType;
  onSearch: (keyword: string, type: SearchType) => void;
}

const props = defineProps<Props>();

const route = useRoute();
const router = useRouter();

// DROPDOWN_ID 상수는 DROPDOWN_IDS.SEARCH_FILTER로 대체

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

  // BoardDetail 페이지에서 검색 시 BoardList로 이동
  if (route.name === 'board-detail' && keyword) {
    const routeName = getBoardRouteName(props.boardType);
    router.push({
      name: routeName,
      query: {
        search: keyword,
        type: localSearchType.value,
        page: 1,
      },
    });
    return;
  }

  props.onSearch(keyword, localSearchType.value);
};
</script>
