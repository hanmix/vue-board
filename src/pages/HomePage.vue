<template>
  <VContainer class="home-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <VCard variant="elevated" padding="lg">
        <template #header>
          <div class="hero-header">
            <h1 class="hero-title">Vue Board</h1>
            <VButton variant="ghost" @click="toggleTheme" class="theme-toggle" :title="`${isDark ? '라이트' : '다크'} 테마로 전환`">
              {{ isDark ? '🌞' : '🌙' }} {{ isDark ? '라이트' : '다크' }}
            </VButton>
          </div>
        </template>

        <div class="hero-content">
          <p class="hero-description">
            Vue 3 + TypeScript로 구축된 현대적인 게시판 애플리케이션
          </p>
          <p class="hero-subtitle">
            Flat 2.0 + Subtle Depth + Adaptive Tokens 디자인 시스템 적용
          </p>

          <div class="hero-actions">
            <VButton variant="primary" size="lg" @click="navigateToSignIn">
              시작하기
            </VButton>
            <VButton
              variant="secondary"
              size="lg"
              @click="navigateToDesignSystem"
            >
              디자인 시스템 보기
            </VButton>
            <VButton
              variant="danger"
              size="lg"
              @click="navigateToNestedTransition"
            >
              중첩 트랜지션 보기
            </VButton>
          </div>
        </div>
      </VCard>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <h2 class="features-title">주요 기능</h2>

      <div class="features-grid">
        <VCard v-for="feature in features" :key="feature.id" variant="default">
          <div class="feature-item">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </VCard>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <VCard variant="outlined" padding="lg">
        <div class="cta-content">
          <h3 class="cta-title">지금 시작해보세요</h3>
          <p class="cta-description">
            Vue Board에서 자유롭게 소통하고 정보를 공유해보세요
          </p>
          <VButton variant="primary" size="lg" @click="navigateToSignIn" block>
            로그인하러 가기
          </VButton>
        </div>
      </VCard>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import './HomePage.css';
import { useRouter } from 'vue-router';
import { useTheme } from '@/design-system/composables/useTheme';
import { VContainer, VCard, VButton } from '@/design-system/components';

const router = useRouter();
const { toggleTheme, isDark } = useTheme();

const navigateToSignIn = () => {
  router.push('/signIn');
};

const navigateToDesignSystem = () => {
  router.push('/design-system');
};

const navigateToNestedTransition = () => {
  router.push('/nested-transition');
};

const features = [
  {
    id: 1,
    icon: '📝',
    title: '자유 게시판',
    description: '다양한 주제로 자유롭게 소통할 수 있는 공간입니다.',
  },
  {
    id: 2,
    icon: '📢',
    title: '공지사항',
    description: '중요한 공지사항과 업데이트 소식을 확인하세요.',
  },
  {
    id: 3,
    icon: '👤',
    title: '마이페이지',
    description: '내가 작성한 글과 댓글을 한 곳에서 관리하세요.',
  },
  {
    id: 4,
    icon: '🎨',
    title: '모던 디자인',
    description: '반응형 디자인과 다크모드를 지원합니다.',
  },
  {
    id: 5,
    icon: '⚡',
    title: '빠른 성능',
    description: 'Vue 3와 Vite로 구축된 빠르고 효율적인 환경입니다.',
  },
  {
    id: 6,
    icon: '🔒',
    title: '안전한 인증',
    description: 'JWT 기반의 안전한 사용자 인증 시스템입니다.',
  },
];
</script>
