import {
  createPostApi,
  createReplyApi,
  getMyPostsApi,
  getPostByIdApi,
  getPostsApi,
} from '@/apis';
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

  const createNewPost = async (title: string, content: string) => {
    loading.value = true;
    error.value = null;

    const payload = { title, content };

    try {
      const { data, isSuccess } = await createPostApi(payload);
      if (!isSuccess) return;
      if (!data.post.id)
        throw (error.value = '게시글 생성 중 오류가 발생했습니다.');

      postList.value.unshift(data.post);
    } catch {
      error.value = '게시글 생성 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const createNewReply = async (
    postId: string,
    title: string,
    content: string
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, isSuccess } = await createReplyApi(postId, title, content);
      if (!isSuccess) {
        error.value = '답글 생성에 실패했습니다.';
        return;
      }

      if (!data.id) {
        error.value = '답글 생성 중 오류가 발생했습니다.';
        throw new Error(error.value);
      }
      const postIdx = postList.value.findIndex(post => post.id === postId);

      if (postIdx !== -1) {
        // postList.value.unshift(data);
        // postList.value[postIdx].replies.push(data.id);
        const targetPost = postList.value[postIdx];

        // replies가 배열인지 보장 (없으면 빈 배열로 초기화)
        const replies = Array.isArray(targetPost.replies)
          ? targetPost.replies
          : [];

        // 객체 교체 방식으로 반응성 100% 보장
        postList.value[postIdx] = {
          ...targetPost,
          replies: [...replies, data.id],
        };
        console.log(replies);
        console.log(postList.value[postIdx]);
        console.log(postList.value);
      }

      console.log(postIdx);
      console.log(data.id);
      console.log(postId);
      console.log('postList.value >>>', postList.value);

      return data;
    } catch (error) {
      console.log(error);
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
    createNewPost,
    createNewReply,
  };
};
