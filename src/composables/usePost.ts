import { usePostStore } from '@/stores';
import { BoardType, Post } from '@/types';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

// 간단한 캐싱을 위한 Map
const postCache = new Map();
const cacheTimeout = 5 * 60 * 1000; // 5분

export const usePost = () => {
  const postStore = usePostStore();
  const {
    loading,
    error,
    postList,
    prevPost,
    currentPost,
    nextPost,
    parentPost,
    isMypage,
    /**
     * @deprecated 아래 pagination 상태들은 더 이상 사용되지 않습니다.
     * @see useBoardData - 통합 게시판 데이터 관리를 사용하세요
     */
    page,
    size,
    lastPage,
    totalPosts,
    searchKeyword,
    searchType,
  } = storeToRefs(postStore);

  const {
    setIsMypage,
    fetchPostById,
    fetchParentPostById,
    createNewPost,
    updatePost,
    deletePost,
    createNewReply,
    /**
     * @deprecated 아래 함수들은 더 이상 사용되지 않습니다.
     * @see useBoardData - 통합 게시판 데이터 관리를 사용하세요
     * @see useMyPageData - 마이페이지 데이터 관리를 사용하세요
     */
    fetchMyPosts,
    resetPagination,
    fetchPosts,
  } = postStore;

  const userIds = computed(() => postList.value.map((post: Post) => post.userId));

  // 캐시된 데이터 확인 함수
  const getCachedData = (key: string) => {
    const cached = postCache.get(key);
    if (cached && Date.now() - cached.timestamp < cacheTimeout) {
      return cached.data;
    }
    return null;
  };

  // 캐시에 데이터 저장 함수
  const setCachedData = (key: string, data: any) => {
    postCache.set(key, {
      data,
      timestamp: Date.now()
    });
  };

  // 캐시를 활용한 게시글 목록 조회
  const fetchPostsWithCache = async (boardType: BoardType = BoardType.FREE, page: number = 1) => {
    const cacheKey = `posts-${boardType}-${page}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      // 캐시된 데이터가 있으면 즉시 반환
      return cachedData;
    }
    
    // 캐시된 데이터가 없으면 API 호출
    const result = await fetchPosts(boardType);
    setCachedData(cacheKey, result);
    return result;
  };

  return {
    // 활성 상태
    loading,
    error,
    postList,
    prevPost,
    currentPost,
    nextPost,
    parentPost,
    isMypage,
    userIds,

    // 활성 함수
    setIsMypage,
    fetchPostsWithCache,
    fetchPostById,
    fetchParentPostById,
    createNewPost,
    updatePost,
    deletePost,
    createNewReply,

    /**
     * @deprecated 아래는 더 이상 사용되지 않습니다.
     * @see useBoardData - 통합 게시판 데이터 관리
     * @see useMyPageData - 마이페이지 데이터 관리
     */
    fetchMyPosts,
    page,
    size,
    lastPage,
    totalPosts,
    searchKeyword,
    searchType,
    resetPagination,
    fetchPosts,
  };
};
