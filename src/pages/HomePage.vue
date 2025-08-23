<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useTheme } from '@/design-system/composables/useTheme';

const router = useRouter();
const { toggleTheme, isDark } = useTheme();

const navigateToSignIn = () => {
  router.push('/signIn');
};

const navigateToDesignSystem = () => {
  router.push('/design-system');
};

const features = [
  {
    id: 1,
    icon: '📝',
    title: '자유 게시판',
    description: '다양한 주제로 자유롭게 소통할 수 있는 공간입니다.'
  },
  {
    id: 2,
    icon: '📢',
    title: '공지사항',
    description: '중요한 공지사항과 업데이트 소식을 확인하세요.'
  },
  {
    id: 3,
    icon: '👤',
    title: '마이페이지',
    description: '내가 작성한 글과 댓글을 한 곳에서 관리하세요.'
  },
  {
    id: 4,
    icon: '🎨',
    title: '모던 디자인',
    description: '반응형 디자인과 다크모드를 지원합니다.'
  },
  {
    id: 5,
    icon: '⚡',
    title: '빠른 성능',
    description: 'Vue 3와 Vite로 구축된 빠르고 효율적인 환경입니다.'
  },
  {
    id: 6,
    icon: '🔒',
    title: '안전한 인증',
    description: 'JWT 기반의 안전한 사용자 인증 시스템입니다.'
  }
];
</script>

<template>
  <VContainer class="home-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <VCard variant="elevated" padding="lg">
        <template #header>
          <div class="hero-header">
            <h1 class="hero-title">Vue Board</h1>
            <VButton variant="ghost" @click="toggleTheme" class="theme-toggle">
              {{ isDark ? '🌞' : '🌙' }}
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
            <VButton variant="secondary" size="lg" @click="navigateToDesignSystem">
              디자인 시스템 보기
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

<style scoped>
.home-page {
  padding: var(--space-8) 0;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  margin-bottom: var(--space-16);
}

.hero-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
}

.theme-toggle {
  font-size: var(--font-size-xl);
}

.hero-content {
  text-align: center;
}

.hero-description {
  font-size: var(--font-size-xl);
  color: var(--color-text);
  margin-bottom: var(--space-2);
  line-height: var(--line-height-relaxed);
}

.hero-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  margin-bottom: var(--space-8);
  line-height: var(--line-height-normal);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* Features Section */
.features-section {
  margin-bottom: var(--space-16);
}

.features-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  text-align: center;
  margin: 0 0 var(--space-8) 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.feature-item {
  text-align: center;
}

.feature-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-4);
}

.feature-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  margin: 0 0 var(--space-2) 0;
}

.feature-description {
  color: var(--color-text-muted);
  line-height: var(--line-height-normal);
  margin: 0;
}

/* CTA Section */
.cta-section {
  margin-bottom: var(--space-8);
}

.cta-content {
  text-align: center;
}

.cta-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0 0 var(--space-3) 0;
}

.cta-description {
  color: var(--color-text-muted);
  margin: 0 0 var(--space-6) 0;
  line-height: var(--line-height-normal);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .hero-header {
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
}
</style>
