<template>
  <div>{{ currentPost.title }}</div>
  <div>{{ currentPost.content }}</div>
</template>

<script setup lang="ts">
import { usePost } from '@/composables';
import { Post } from '@/types';
import { onMounted, ref } from 'vue';

const { id } = defineProps<{
  id: string;
}>();

const { fetchPostById } = usePost();
const currentPost = ref<Post>();

const handleFetchPostById = async () => {
  try {
    if (!id) return;
    const post = await fetchPostById(id);

    currentPost.value = post;
  } catch (error) {
    console.error('API 호출 에러:', error);
    throw error;
  }
};

onMounted(async () => {
  await handleFetchPostById();
});
</script>

<style scoped></style>
