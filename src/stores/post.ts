import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getPosts, getPostById } from '@/apis/post';
import type { Post } from '@/types/post';

export const usePostStore = defineStore('post', () => {
  const posts1 = ref<Post[]>([]);
  const currentPost = ref<Post | null>(null);
  const token = localStorage.getItem('token');

  const loadPosts = async (params: {
    page: number;
    size: number;
    type: string;
    keyword: string;
  }) => {
    if (typeof token === 'string') {
      try {
        const {
          isSuccess,
          message,
          data: { posts },
        } = await getPosts(params, token);
        if (!isSuccess) throw new Error('Failed to load posts');
        posts1.value = posts;
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

  return {
    posts1,
    currentPost,
    token,
    loadPosts,
    loadPostById,
  };
});
