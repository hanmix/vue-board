import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Comment } from '@/types';
import { createComment, deleteComment, getCommentsByPostId, updateComment } from '@/apis';

export const useCommentStore = defineStore('comment', () => {
  const comments = ref<Comment[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchCommentsByPostId = async (postId: string, token: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const { data, isSuccess } = await getCommentsByPostId(postId, token);
      if (!isSuccess)
        throw (error.value = '댓글을 불러오는데 실패했습니다.');

      comments.value = data;
    } catch {
      error.value = '댓글 조회 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const addComment = async (
    postId: string,
    content: string,
    to: string,
    token: string
  ): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const { data, isSuccess } = await createComment(postId, content, to, token);
      if (!isSuccess)
        throw (error.value = '댓글 작성에 실패했습니다.');

      comments.value.push(data);
    } catch {
      error.value = '댓글 작성 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const editComment = async (
    commentId: string,
    content: string,
    token: string
  ): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const { data, isSuccess } = await updateComment(commentId, content, token);
      if (!isSuccess)
        throw (error.value = '댓글 수정에 실패했습니다.');

      const commentIdx = comments.value.findIndex(comment => comment.id === commentId);
      if (commentIdx !== -1) {
        comments.value[commentIdx] = data;
      }
    } catch {
      error.value = '댓글 수정 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  const removeComment = async (commentId: string, token: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const { isSuccess } = await deleteComment(commentId, token);
      if (!isSuccess)
        throw (error.value = '댓글 삭제에 실패했습니다.');

      const commentIdx = comments.value.findIndex(comment => comment.id === commentId);
      if (commentIdx !== -1) {
        comments.value.splice(commentIdx, 1);
      }
    } catch {
      error.value = '댓글 삭제 중 오류가 발생했습니다.';
    } finally {
      loading.value = false;
    }
  };

  return {
    comments,
    loading,
    error,

    fetchCommentsByPostId,
    addComment,
    editComment,
    removeComment,
  };
});
