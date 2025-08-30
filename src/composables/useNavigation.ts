import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { SearchType } from '@/types';

// 전역 상태로 선언 (컴포넌트 간 공유)
const isSearchVisible = ref(false);

export const useNavigation = () => {
  const route = useRoute();
  const router = useRouter();

  const setIsSearchVisible = (value: boolean) => {
    isSearchVisible.value = value;
  };
  const toggleSearchBar = () => {
    isSearchVisible.value = !isSearchVisible.value;
  };

  // URL 쿼리에서 현재 상태 읽기
  const currentPage = computed(() => Number(route.query.page) || 1);
  const searchKeyword = computed(() => (route.query.search as string) || '');
  const searchType = computed(
    () => (route.query.type as SearchType) || 'title'
  );

  const navigate = (rotue: string) => {
    router.push(rotue);
  };

  // 페이지 변경
  const goToPage = (page: number) => {
    router.push({
      query: { ...route.query, page },
    });
  };

  // 검색 설정 (페이지는 1로 리셋)
  const setSearch = (keyword: string, type: SearchType = 'title') => {
    router.push({
      query: { ...route.query, search: keyword, type, page: 1 },
    });
  };

  // 검색 초기화
  const clearSearch = () => {
    const { search, type, ...restQuery } = route.query;
    router.push({
      query: { ...restQuery, page: 1 },
    });
  };

  // 모든 필터 초기화
  const resetFilters = () => {
    router.push({
      query: { page: 1 },
    });
  };

  const closeSearchOnNavigation = () => {
    if (isSearchVisible.value) {
      isSearchVisible.value = false;
    }
  };

  return {
    // 현재 상태
    currentPage,
    searchKeyword,
    searchType,
    isSearchVisible,

    // 액션
    navigate,
    goToPage,
    setSearch,
    clearSearch,
    resetFilters,
    setIsSearchVisible,
    toggleSearchBar,
    closeSearchOnNavigation,
  };
};
