import { usePost } from '@/composables';
import type { SearchType } from '@/types';
import { usePostStore } from '@/stores';
import { storeToRefs } from 'pinia';

export const usePagination = () => {
  const postStore = usePostStore();
  const { page, lastPage } = storeToRefs(postStore);
  const { fetchPosts } = usePost();

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
    fetchPosts();
  };

  return {
    searchOptions,
    prevPage,
    nextPage,
    onSearch,
  };
};
