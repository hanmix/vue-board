import { usePostStore } from '@/stores';
import { storeToRefs } from 'pinia';

export const usePagination = () => {
  const postStore = usePostStore();
  const {
    loading,
    error,
    postList,
    page,
    lastPage,
    totalPosts,
    searchKeyword,
    filterType,
  } = storeToRefs(postStore);
  const { fetchPosts } = postStore;

  const prevPage = async (): Promise<void> => {
    if (page.value > 1) {
      page.value--;
      fetchPosts();
    }
  };

  const nextPage = async (): Promise<void> => {
    if (page.value < lastPage.value) {
      page.value++;
      fetchPosts();
    }
  };

  const onSearch = () => {
    page.value = 1;
    fetchPosts();
  };

  return {
    loading,
    error,
    postList,
    page,
    lastPage,
    totalPosts,
    searchKeyword,
    filterType,
    prevPage,
    nextPage,
    onSearch,
    fetchPosts,
  };
};
