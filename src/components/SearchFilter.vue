<template>
  <div class="search-filter-container">
    <form class="search-form" @submit.prevent="handleSearch">
      <div class="search-input-group">
        <div class="search-input-wrapper">
          <!-- 인라인 라벨 + 입력 필드 통합 -->
          <div class="inline-search-container" ref="searchContainer">
            <!-- 검색 타입 라벨 (클릭 가능) -->
            <button
              type="button"
              class="search-type-label"
              @click="toggleSearchTypeDropdown"
              :class="{ active: showDropdown }"
              aria-label="검색 타입 선택"
              :aria-expanded="showDropdown"
            >
              {{ currentSearchLabel }}
              <svg
                class="dropdown-arrow"
                :class="{ rotated: showDropdown }"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
              >
                <path d="M6 8L0 0H12L6 8Z" fill="currentColor" />
              </svg>
            </button>

            <!-- 드롭다운 메뉴 - body 레벨로 이동 -->
            <Teleport to="body">
              <div
                v-show="showDropdown"
                class="search-type-dropdown-portal"
                :style="dropdownStyle"
              >
                <button
                  v-for="option in searchOptions"
                  :key="option.value"
                  type="button"
                  class="dropdown-option"
                  :class="{ selected: searchType === option.value }"
                  @click="selectSearchType(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </Teleport>

            <!-- 검색 입력 필드 -->
            <input
              id="search-keyword"
              name="searchKeyword"
              type="text"
              class="inline-search-input"
              v-model="searchKeyword"
              :placeholder="searchPlaceholder"
            />
          </div>

          <button type="submit" class="search-button">
            <svg
              class="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { usePagination, usePost, useBreakpoint } from '@/composables';
import { BoardType } from '@/types';
import { SPACING } from '@/utils';

const { searchOptions, onSearch } = usePagination();
const { searchKeyword, searchType } = usePost();
const { isMobile, windowWidth } = useBreakpoint();

const { boardType } = defineProps<{
  boardType: BoardType;
}>();

// 드롭다운 상태 관리
const showDropdown = ref(false);
const searchContainer = ref<HTMLElement>();

// 드롭다운 위치 강제 업데이트를 위한 키
const dropdownPositionKey = ref(0);

// 현재 선택된 검색 타입의 라벨
const currentSearchLabel = computed(() => {
  const option = searchOptions.find(opt => opt.value === searchType.value);
  return option ? option.label : '게시글 제목';
});

// 검색 플레이스홀더 동적 생성
const searchPlaceholder = computed(() => {
  return `${currentSearchLabel.value} 검색어를 입력하세요...`;
});

// 드롭다운 위치 계산 (반응형 자동 계산)
const dropdownStyle = computed(() => {
  if (!searchContainer.value) return {};

  // dropdownPositionKey를 사용하여 강제 재계산 트리거
  dropdownPositionKey.value; // 의존성 추가

  const rect = searchContainer.value.getBoundingClientRect();

  if (isMobile.value) {
    // 모바일: 레이아웃 전체 너비에 맞게 조정
    return {
      position: 'fixed' as const,
      top: `${rect.bottom + SPACING.XS}px`,
      left: `${SPACING.MD}px`,
      right: `${SPACING.MD}px`,
      width: 'auto',
      zIndex: 99999,
    } as const;
  } else {
    // 데스크탑: 기존 방식 유지
    return {
      position: 'fixed' as const,
      top: `${rect.bottom + SPACING.XS}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      zIndex: 99999,
    } as const;
  }
});

// 드롭다운 토글
const toggleSearchTypeDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// 검색 타입 선택
const selectSearchType = (value: string) => {
  searchType.value = value as any;
  showDropdown.value = false;
};

// 외부 클릭 시 드롭다운 닫기
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.inline-search-container')) {
    showDropdown.value = false;
  }
};

// 스크롤 디바운싱을 위한 타이머
let scrollTimer: ReturnType<typeof setTimeout> | null = null;

// 스크롤 시 드롭다운 처리
const handleScroll = () => {
  if (!showDropdown.value) return;

  // 성능 최적화를 위한 디바운싱
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  scrollTimer = setTimeout(() => {
    if (showDropdown.value) {
      // 옵션 1: 스크롤 시 드롭다운 닫기 (모바일 친화적)
      showDropdown.value = false;
      
      // 옵션 2: 스크롤 시 위치 실시간 업데이트 (데스크탑 친화적)
      // 아래 주석을 해제하고 위 라인을 주석하면 실시간 업데이트 모드
      // updateDropdownPosition();
    }
    scrollTimer = null;
  }, 100); // 100ms 디바운싱
};

// 검색 실행
const handleSearch = () => {
  onSearch(boardType);
};

// 드롭다운 위치 업데이트 함수
const updateDropdownPosition = async () => {
  if (showDropdown.value) {
    await nextTick();
    dropdownPositionKey.value++;
  }
};

// 화면 크기 변경 감지 및 드롭다운 위치 업데이트
watch([windowWidth, isMobile], () => {
  updateDropdownPosition();
});

// 드롭다운 열림/닫힘 시 위치 초기화
watch(showDropdown, (isOpen: boolean) => {
  if (isOpen) {
    nextTick(() => {
      dropdownPositionKey.value++;
    });
  }
});

// 이벤트 리스너 등록/해제
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  // 윈도우 리사이즈 이벤트 추가 리스너 (브레이크포인트 외 세밀한 조정용)
  window.addEventListener('resize', updateDropdownPosition);
  // 스크롤 이벤트 리스너 추가
  document.addEventListener('scroll', handleScroll, true); // capture phase에서 처리
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
  document.removeEventListener('scroll', handleScroll, true);
  
  // 스크롤 타이머 정리
  if (scrollTimer) {
    clearTimeout(scrollTimer);
    scrollTimer = null;
  }
});
</script>
