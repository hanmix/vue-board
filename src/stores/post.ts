import type { SearchType, Post, PaginationParams, BoardType } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  createPostApi,
  createReplyApi,
  deletePostApi,
  getMyPostsApi,
  getPostByIdApi,
  getPostsApi,
  updatePostApi,
} from '@/apis';

export const usePostStore = defineStore('post', () => {
  const postList = ref<Post[]>([]);
  const searchType = ref<SearchType>('title');
  const searchKeyword = ref('');
  const totalPosts = ref<number>(0);
  const size = ref<number>(10);
  const page = ref<number>(1);
  const lastPage = ref<number>(0);
  const prevPost = ref<Post | null>(null);
  const currentPost = ref<Post | null>(null);
  const nextPost = ref<Post | null>(null);
  const parentPost = ref<Post | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const isMypage = ref<boolean>(true);

  const setIsMypage = (value: boolean) => {
    isMypage.value = value;
  };

  const fetchPosts = async (board: BoardType): Promise<void> => {
    loading.value = true;
    error.value = null;
    const params: PaginationParams = {
      board,
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
      const {
        data: { prev, post, next },
        isSuccess,
      } = await getPostByIdApi(id);
      if (!isSuccess)
        throw (error.value = '게시글 상세 조회 중 오류가 발생했습니다.');

      prevPost.value = prev;
      currentPost.value = post;
      nextPost.value = next;
    } catch {
      error.value = '게시글 상세 조회 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const fetchParentPostById = async (parentId: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const { data, isSuccess } = await getPostByIdApi(parentId);
      if (!isSuccess)
        throw (error.value = '게시글 상세 조회 중 오류가 발생했습니다.');
      if (!data.post) return;
      parentPost.value = data.post;
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

  const updatePost = async (
    postId: string,
    title: string,
    content: string
  ): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const { data, isSuccess } = await updatePostApi(postId, title, content);
      if (!isSuccess)
        throw (error.value = '게시글 수정 중 오류가 발생했습니다.');

      const postIdx = postList.value.findIndex(post => post.id === postId);
      if (postIdx !== -1) {
        postList.value.splice(postIdx, 1, data);
      }

      if (currentPost.value?.id === postId) {
        currentPost.value = data;
      }
    } catch {
      error.value = '게시글 수정 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const deletePost = async (postId: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const { isSuccess } = await deletePostApi(postId);
      if (!isSuccess)
        throw (error.value = '게시글 삭제 중 오류가 발생했습니다.');
      const postIdx = postList.value.findIndex(post => post.id === postId);

      if (postIdx === -1) {
        postList.value.splice(postIdx, 1);
      }
    } catch {
      error.value = '게시글 삭제 중 오류가 발생했습니다.';
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
        const targetPost = postList.value[postIdx];

        const replies = Array.isArray(targetPost.replies)
          ? targetPost.replies
          : [];

        postList.value[postIdx] = {
          ...targetPost,
          replies: [...replies, data.id],
        };
      }

      return data;
    } catch (error) {
      console.log(error);
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
    prevPost,
    currentPost,
    nextPost,
    parentPost,
    loading,
    error,
    isMypage,

    setIsMypage,
    fetchPosts,
    fetchMyPosts,
    fetchPostById,
    fetchParentPostById,
    createNewPost,
    updatePost,
    deletePost,
    createNewReply,
  };
});
