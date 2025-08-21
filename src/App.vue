<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 라우터 전환 시 로딩 상태 관리
const router = useRouter()
const isLoading = ref(false)

// 라우터 네비게이션 가드로 로딩 상태 관리
router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  // 약간의 딜레이 후 로딩 해제 (UX 개선)
  setTimeout(() => {
    isLoading.value = false
  }, 150)
})
</script>

<template>
  <!-- 로딩 중일 때 -->
  <div v-if="isLoading" class="app-loading">
    <div class="loading-spinner"></div>
    <p class="loading-text">페이지를 불러오는 중...</p>
  </div>
  
  <!-- 로딩 완료 시 -->
  <router-view v-else />
</template>
