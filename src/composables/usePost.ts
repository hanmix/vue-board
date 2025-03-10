import { usePostStore } from '@/stores';

export const usePost = () => {
  const postStore = usePostStore();
  const { fetchPosts } = postStore;

  return {
    fetchPosts,
  };
};
