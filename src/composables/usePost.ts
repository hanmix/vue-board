import { usePostStore } from '@/stores';
import type { BoardType } from '@/types';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

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
    page,
    size,
    lastPage,
    totalPosts,
    searchKeyword,
    searchType,
    isMypage,
  } = storeToRefs(postStore);

  const {
    setIsMypage,
    fetchPosts,
    fetchMyPosts,
    fetchPostById,
    fetchParentPostById,
    createNewPost,
    updatePost,
    deletePost,
    createNewReply,
  } = postStore;

  const userIds = computed(() => postList.value.map(post => post.userId));

  return {
    loading,
    error,
    postList,
    prevPost,
    currentPost,
    nextPost,
    parentPost,
    page,
    size,
    lastPage,
    totalPosts,
    searchKeyword,
    searchType,
    isMypage,
    userIds,

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
};
