import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { SearchType } from '@/types';

export const useNavigation = () => {
  const route = useRoute();
  const router = useRouter();

  // URL 쿼리에서 현재 상태 읽기
  const currentPage = computed(() => Number(route.query.page) || 1);
  const searchKeyword = computed(() => (route.query.search as string) || '');
  const searchType = computed(
    () => (route.query.type as SearchType) || 'title'
  );

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

  return {
    // 현재 상태
    currentPage,
    searchKeyword,
    searchType,

    // 액션
    goToPage,
    setSearch,
    clearSearch,
    resetFilters,
  };
};
