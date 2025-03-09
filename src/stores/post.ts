import { getPostsApi } from '@/apis';
import type { PaginationParams, Post } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePostStore = defineStore('post', () => {
  // 상태 정의
  const postList = ref<Post[]>([]);
  const filterType = ref('title');
  const searchKeyword = ref('');
  const totalPosts = ref<number>(0);
  const size = ref<number>(10);
  const page = ref<number>(1);
  const lastPage = ref<number>(0);
  const currentPost = ref<Post | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // 게시글 목록 조회 (검색, 필터, 페이징 적용)
  const fetchPosts = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    const params: PaginationParams = {
      page: page.value,
      size: size.value,
      type: filterType.value,
      keyword: searchKeyword.value,
    };
    try {
      const {
        isSuccess,
        data: { posts, pagination },
      } = await getPostsApi(params);

      if (!isSuccess) {
        throw new Error('게시글 목록을 불러오는데 실패했습니다.');
      }

      postList.value = posts;
      totalPosts.value = pagination.total;
      size.value = pagination.size;
      page.value = parseInt(pagination.page);
      lastPage.value = pagination.lastPage;
    } catch (err: any) {
      error.value = err.message || '게시글 목록 조회 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  return {
    postList,
    filterType,
    searchKeyword,
    totalPosts,
    size,
    page,
    lastPage,
    currentPost,
    loading,
    error,
    fetchPosts,
  };
});
