<template>
  <div class="post-container">
    <div v-for="post in postStore.posts1" :key="post.id" class="post">
      <div v-if="post.type === 'post'">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-content">{{ post.content }}</p>
        <p>{{ post.type }}</p>
      </div>
    </div>
  </div>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">이전</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      다음
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePostStore } from '@/stores/post';

const postStore = usePostStore();
const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => {
  return Math.ceil(postStore.posts1.length / pageSize.value);
});

const loadPosts = async () => {
  try {
    await postStore.loadPosts({
      page: currentPage.value,
      size: pageSize.value,
      type: 'title',
      keyword: 'react',
    });
  } catch (error) {
    console.error('Failed to load posts', error);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadPosts();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadPosts();
  }
};

onMounted(() => {
  loadPosts();
});
</script>

<style scoped>
.post-container {
  display: grid;
  justify-content: center;
  align-items: center;
}

.post {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.post-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.post-content {
  font-size: 1em;
  color: #ddd;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  font-size: 1em;
  cursor: pointer;
}

.pagination span {
  font-size: 1em;
}
</style>
