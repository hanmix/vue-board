import { usePost } from '@/composables';

export const usePagination = () => {
  const { page, lastPage, searchKeyword, searchType, fetchPosts } = usePost();

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
      fetchPosts();
    }
  };

  const nextPage = () => {
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
    searchKeyword,
    searchType,
    prevPage,
    nextPage,
    onSearch,
    fetchPosts,
  };
};
