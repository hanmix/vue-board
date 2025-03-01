import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { getPosts, getPostById } from '@/apis/post';
import type { Post } from '@/types/post';
import type { PaginationParams, PageInfo } from '@/types';

export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([]);
  const pagination = ref<PageInfo>({
    total: 0,
    size: 10,
    page: 1,
    lastPage: 1,
  });
  const currentPost = ref<Post | null>(null);
  const params = ref<PaginationParams>({
    page: 1,
    size: 10,
    type: 'user',
    keyword: '',
  });
  const token = localStorage.getItem('token');

  const loadPosts = async () => {
    if (typeof token === 'string') {
      try {
        const { isSuccess, message, data, pageInfo } = await getPosts(
          params.value,
          token
        );
        if (!isSuccess) throw new Error('Failed to load posts');
        posts.value = data;
        pagination.value = pageInfo;
        console.log(message);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    } else {
      console.log('Failed to load posts');
    }
  };

  const loadPostById = async (id: string, token: string) => {
    try {
      currentPost.value = await getPostById(id, token);
    } catch (error) {
      console.error('Failed to fetch post', error);
    }
  };

  watch(params, loadPosts, { deep: true, immediate: true });

  return {
    posts,
    currentPost,
    pagination,
    params,
    token,
    loadPosts,
    loadPostById,
  };
});
