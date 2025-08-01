import { getMyPostsApi, getPostByIdApi, getPostsApi } from '@/apis';
import { usePostStore } from '@/stores';
import type { PaginationParams } from '@/types';
import { storeToRefs } from 'pinia';

export const usePost = () => {
  const postStore = usePostStore();
  const {
    loading,
    error,
    postList,
    currentPost,
    page,
    size,
    lastPage,
    totalPosts,
    searchKeyword,
    searchType,
  } = storeToRefs(postStore);

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

  const fetchMyPosts = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    const params: PaginationParams = {
      page: page.value ?? 1,
      size: size.value ?? 10,
    };
    try {
      const {
        data: { posts, pagination },
        isSuccess,
      } = await getMyPostsApi(params);
      if (!isSuccess)
        throw (error.value = '내 게시글 조회 중 오류가 발생했습니다.');
      postList.value = posts;
      totalPosts.value = pagination.total;
      size.value = pagination.size;
      page.value = Number(pagination.page) ?? 1;
      lastPage.value = pagination.lastPage;
    } catch (error) {
      console.error('내 게시글 조회 중 오류가 발생했습니다.', error);
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
    loading,
    error,
    postList,
    currentPost,
    page,
    lastPage,
    totalPosts,
    searchKeyword,
    searchType,
    fetchPosts,
    fetchMyPosts,
    fetchPostById,
  };
};
