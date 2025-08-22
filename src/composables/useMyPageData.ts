import { ref, watch, computed } from 'vue';
import { useNavigation } from './useNavigation';
import { getMyPostsApi } from '@/apis';
import type { Post, ProcessedPost, PaginationParams } from '@/types';

export const useMyPageData = () => {
  const navigation = useNavigation();

  // 로컬 상태
  const loading = ref(false);
  const error = ref<string | null>(null);
  const posts = ref<Post[]>([]);
  const totalPosts = ref(0);
  const lastPage = ref(1);

  // API 호출 함수
  const fetchMyPosts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const params: PaginationParams = {
        page: navigation.currentPage.value,
        size: 10,
      };

      const { isSuccess, data: { posts: apiPosts, pagination } } = await getMyPostsApi(params);
      
      if (!isSuccess) {
        throw new Error('내 게시글 조회 중 오류가 발생했습니다.');
      }

      // 로컬 상태 업데이트
      posts.value = apiPosts;
      totalPosts.value = pagination.total;
      lastPage.value = pagination.lastPage;
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : '내 게시글을 불러오는데 실패했습니다.';
      console.error('fetchMyPosts error:', err);
    } finally {
      loading.value = false;
    }
  };

  // URL 쿼리 변경 감지하여 API 호출 (페이지만 감지)
  watch(
    navigation.currentPage,
    () => {
      fetchMyPosts();
    },
    { immediate: true }
  );

  // 효율적인 게시글 인덱싱을 위한 Map
  const postsMap = computed(() => {
    const map = new Map<string, Post>();
    posts.value.forEach(post => map.set(post.id, post));
    return map;
  });

  // 부모 게시글 삭제 여부를 포함한 가공된 게시글 목록
  const processedPosts = computed<ProcessedPost[]>(() => {
    const map = postsMap.value;
    
    return posts.value.map(post => {
      // 답글이 아니거나 부모 ID가 없는 경우
      if (post.type !== 'reply' || !post.parentId) {
        return { ...post, isParentDeleted: false };
      }
      
      // 부모 게시글 찾기
      const parent = map.get(post.parentId);
      
      return {
        ...post,
        isParentDeleted: !parent || parent.isDeleted
      };
    });
  });

  // 삭제되지 않은 게시글만 필터링
  const filteredPosts = computed(() => 
    processedPosts.value.filter(post => !post.isDeleted)
  );

  return {
    // 데이터
    posts: processedPosts,
    filteredPosts,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    totalPosts: computed(() => totalPosts.value),
    lastPage: computed(() => lastPage.value),

    // 네비게이션 상태
    currentPage: navigation.currentPage,

    // 액션
    goToPage: navigation.goToPage,
    refetch: fetchMyPosts,
  };
};