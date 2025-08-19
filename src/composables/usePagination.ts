import { usePost } from '@/composables';
import { BoardType, type SearchType } from '@/types';
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

  const moveToFirstPage = () => {
    page.value = 1;
  };

  const moveToLastPage = () => {
    page.value = lastPage.value;
  };

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

  const onSearch = (boardType: BoardType) => {
    page.value = 1;
    fetchPosts(boardType);
  };

  return {
    searchOptions,

    moveToFirstPage,
    moveToLastPage,
    prevPage,
    nextPage,
    onSearch,
  };
};
