<template>
  <header class="header">
    <h1>싱글벙글 게시판</h1>
    <div class="nav-buttons">
      <button @click="moveToHome">홈</button>
      <div v-if="route.name === 'mypage'">
        <button @click="handleLogout">로그아웃</button>
      </div>
      <div v-else>
        <button
          v-if="route.name === 'board-list'"
          @click="setIsModalOpen(true)"
        >
          글쓰기
        </button>
        <button @click="moveToMyPage">마이페이지</button>
      </div>
    </div>
  </header>

  <NewPostModal
    :isVisible="isVisible"
    @onClose="hideModal"
    @onCreate="handleCreate"
    @onUpdate="handleUpdate"
  />
</template>

<script setup lang="ts">
import NewPostModal from './NewPostModal.vue';
import { useModal, usePost, useAuth } from '@/composables';
import { useRouter, useRoute } from 'vue-router';

const { isVisible, setIsModalOpen, showModal, hideModal } = useModal();
const { fetchPosts } = usePost();
const { logout } = useAuth();
const router = useRouter();
const route = useRoute();

function handleCreate() {
  showModal();
}

function handleUpdate() {
  fetchPosts();
  hideModal();
}

function handleLogout() {
  const confirmed = confirm('정말 로그아웃 하시겠습니까?');
  if (!confirmed) return;
  logout();
  router.push('/signIn');
}

function moveToHome() {
  router.push('/board');
}

function moveToMyPage() {
  router.push('/mypage');
}
</script>

<style scoped></style>
