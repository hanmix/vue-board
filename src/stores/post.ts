import type { SearchType, Post } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePostStore = defineStore('post', () => {
  const postList = ref<Post[]>([]);
  const searchType = ref<SearchType>('title');
  const searchKeyword = ref('');
  const totalPosts = ref<number>(0);
  const size = ref<number>(10);
  const page = ref<number>(1);
  const lastPage = ref<number>(0);
  const currentPost = ref<Post>();
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  return {
    postList,
    searchType,
    searchKeyword,
    totalPosts,
    size,
    page,
    lastPage,
    currentPost,
    loading,
    error,
  };
});
