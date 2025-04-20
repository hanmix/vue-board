import { usePost } from '@/composables';
import type { SearchType } from '@/types';

export const usePagination = () => {
  const { page, lastPage, searchKeyword, searchType, fetchPosts } = usePost();

  const searchOptions: { value: SearchType; label: string }[] = [
    { value: 'title', label: '제목' },
    { value: 'content', label: '내용' },
    { value: 'title_content', label: '제목+내용' },
    { value: 'user', label: '작성자' },
  ];

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
    }
  };

  const nextPage = () => {
    if (page.value < lastPage.value) {
      page.value++;
    }
  };

  const onSearch = () => {
    page.value = 1;
  };

  return {
    searchKeyword,
    searchType,
    searchOptions,
    prevPage,
    nextPage,
    onSearch,
    fetchPosts,
  };
};
