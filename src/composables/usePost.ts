import { usePostStore } from '@/stores';
import { storeToRefs } from 'pinia';

export const usePost = () => {
  const postStore = usePostStore();
  const {
    loading,
    error,
    postList,
    page,
    lastPage,
    totalPosts,
    searchKeyword,
    searchType,
  } = storeToRefs(postStore);
  const { fetchPosts } = postStore;

  return {
    loading,
    error,
    postList,
    page,
    lastPage,
    totalPosts,
    searchKeyword,
    searchType,
    fetchPosts,
  };
};
