import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  getPostsApi,
  getMyPostsApi,
  getPostApi,
  createPostApi,
  replyPostApi,
  updatePostApi,
  increaseViewApi,
  likePostApi,
  dislikePostApi,
  deletePostApi,
} from '@/apis';
import type { Post } from '@/types/post';

export const usePostStore = defineStore('post', () => {
  // 상태 정의
  const posts = ref<Post[]>([]);
  const totalPosts = ref(0);
  const currentPost = ref<Post | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 게시글 목록 조회 (검색, 필터, 페이징 적용)
  const fetchPosts = async (
    page: number,
    size: number,
    type: string,
    keyword: string
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const { isSuccess, data, message } = await getPostsApi(
        page,
        size,
        type,
        keyword
      );
      if (isSuccess) {
        posts.value = data.posts;
        totalPosts.value = data.total;
      } else {
        error.value = message || '게시글 목록을 불러오는데 실패했습니다.';
      }
    } catch (err: any) {
      error.value = err.message || '게시글 목록 조회 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  // 내 게시글 목록 조회
  const fetchMyPosts = async (
    page: number,
    size: number,
    type: string,
    keyword: string
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const { isSuccess, data, message } = await getMyPostsApi(
        page,
        size,
        type,
        keyword
      );
      if (isSuccess) {
        posts.value = data.posts;
        totalPosts.value = data.total;
      } else {
        error.value = message || '내 게시글 목록을 불러오는데 실패했습니다.';
      }
    } catch (err: any) {
      error.value =
        err.message || '내 게시글 목록 조회 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  // 게시글 상세 조회
  const fetchPostById = async (postId: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { isSuccess, data, message } = await getPostApi(postId);
      if (isSuccess) {
        currentPost.value = data;
      } else {
        error.value = message || '게시글을 불러오는데 실패했습니다.';
      }
    } catch (err: any) {
      error.value = err.message || '게시글 상세 조회 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  // 게시글 작성
  const createPost = async (title: string, content: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { isSuccess, data, message } = await createPostApi({
        title,
        content,
      });
      if (isSuccess) {
        posts.value.unshift(data);
      } else {
        error.value = message || '게시글 작성에 실패했습니다.';
      }
    } catch (err: any) {
      error.value = err.message || '게시글 작성 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  // 답글 작성
  const replyPost = async (postId: string, content: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { isSuccess, message } = await replyPostApi(postId, { content });
      if (!isSuccess) error.value = message || '답글 작성에 실패했습니다.';
    } catch (err: any) {
      error.value = err.message || '답글 작성 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  // 게시글 수정
  const updatePost = async (postId: string, title: string, content: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { isSuccess, data, message } = await updatePostApi(postId, {
        title,
        content,
      });
      if (isSuccess) {
        currentPost.value = data;
        const index = posts.value.findIndex(p => p.id === postId);
        if (index !== -1) posts.value[index] = data;
      } else {
        error.value = message || '게시글 수정에 실패했습니다.';
      }
    } catch (err: any) {
      error.value = err.message || '게시글 수정 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  // 게시글 조회수 증가
  const increaseView = async (postId: string) => {
    try {
      await increaseViewApi(postId);
      if (currentPost.value?.id === postId) {
        currentPost.value.view++;
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // 게시글 좋아요
  const likePost = async (postId: string) => {
    try {
      await likePostApi(postId);
      if (currentPost.value?.id === postId) {
        currentPost.value.likes++;
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // 게시글 싫어요
  const dislikePost = async (postId: string) => {
    try {
      await dislikePostApi(postId);
      if (currentPost.value?.id === postId) {
        currentPost.value.dislikes++;
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  // 게시글 삭제
  const deletePost = async (postId: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { isSuccess, message } = await deletePostApi(postId);
      if (isSuccess) {
        posts.value = posts.value.filter(post => post.id !== postId);
      } else {
        error.value = message || '게시글 삭제에 실패했습니다.';
      }
    } catch (err: any) {
      error.value = err.message || '게시글 삭제 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  return {
    posts,
    totalPosts,
    currentPost,
    loading,
    error,
    fetchPosts,
    fetchMyPosts,
    fetchPostById,
    createPost,
    replyPost,
    updatePost,
    increaseView,
    likePost,
    dislikePost,
    deletePost,
  };
});
