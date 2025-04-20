import { getPostByIdApi, getPostsApi } from '@/apis';
import type { SearchType, PaginationParams, Post } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePostStore = defineStore('post', () => {
  const postList = ref<Post[]>([]);
  const searchType = ref<SearchType>('title');
  const searchKeyword = ref('');
  const totalPosts = ref<number>(0);
  const size = ref<number>(10);
  const page = ref<number>(1);
  const lastPage = ref<number>(0);
  const currentPost = ref<Post>();
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchPosts = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    const params: PaginationParams = {
      page: page.value ?? 1,
      size: size.value ?? 10,
      type: searchType.value,
      keyword: searchKeyword.value,
    };
    try {
      const {
        isSuccess,
        data: { posts, pagination },
      } = await getPostsApi(params);

      if (!isSuccess)
        throw (error.value = '게시글 목록을 불러오는데 실패했습니다.');

      postList.value = posts;
      totalPosts.value = pagination.total;
      size.value = pagination.size;
      page.value = Number(pagination.page) ?? 1;
      lastPage.value = pagination.lastPage;
    } catch {
      error.value = '게시글 목록 조회 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const fetchPostById = async (id: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const { data, isSuccess } = await getPostByIdApi(id);
      if (!isSuccess)
        throw (error.value = '게시글 상세 조회 중 오류가 발생했습니다.');

      currentPost.value = data.post;
    } catch {
      error.value = '게시글 상세 조회 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  return {
    postList,
    searchType,
    searchKeyword,
    totalPosts,
    size,
    page,
    lastPage,
    currentPost,
    loading,
    error,
    fetchPosts,
    fetchPostById,
  };
});
