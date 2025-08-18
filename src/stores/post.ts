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
  const prevPost = ref<Post | null>(null);
  const currentPost = ref<Post | null>(null);
  const nextPost = ref<Post | null>(null);
  const parentPost = ref<Post | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const isMypage = ref<boolean>(true);
  const setIsMypage = (value: boolean) => {
    isMypage.value = value;
  };

  return {
    postList,
    searchType,
    searchKeyword,
    totalPosts,
    size,
    page,
    lastPage,
    prevPost,
    currentPost,
    nextPost,
    parentPost,
    loading,
    error,
    isMypage,

    setIsMypage,
  };
});
