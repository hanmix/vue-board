import { usePostStore } from '@/stores';
import { storeToRefs } from 'pinia';

export const usePost = () => {
  const postStore = usePostStore();
  const {
    loading,
    error,
    postList,
    currentPost,
    page,
    lastPage,
    totalPosts,
    searchKeyword,
    searchType,
  } = storeToRefs(postStore);
  const { fetchPosts, fetchPostById } = postStore;

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
    fetchPostById,
  };
};
