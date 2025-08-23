<template>
  <VContainer>
    <div style="padding: var(--space-8) 0;">
      <!-- 헤더 섹션 -->
      <VCard variant="elevated" padding="lg">
        <template #header>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <h1 style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin: 0;">
              Vue Board 디자인 시스템
            </h1>
            <VButton variant="ghost" @click="toggleTheme">
              {{ isDark ? '🌞' : '🌙' }}
            </VButton>
          </div>
        </template>

        <div style="text-align: center;">
          <p style="font-size: var(--font-size-lg); color: var(--color-text-muted); margin-bottom: var(--space-6);">
            Flat 2.0 + Subtle Depth + Adaptive Tokens 디자인 시스템
          </p>
          <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
            <VButton variant="primary" size="lg">시작하기</VButton>
            <VButton variant="secondary" size="lg">문서 보기</VButton>
            <VButton variant="ghost" size="lg">설정</VButton>
            <VButton variant="danger" size="lg" :loading="isLoading" @click="testLoading">
              {{ isLoading ? '로딩 중...' : '위험' }}
            </VButton>
          </div>
        </div>
      </VCard>

      <!-- 컴포넌트 쇼케이스 -->
      <div style="margin-top: var(--space-16);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); text-align: center; margin-bottom: var(--space-8);">
          컴포넌트 쇼케이스
        </h2>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-6);">
          <VCard variant="default">
            <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium); margin-bottom: var(--space-2);">
              기본 카드
            </h3>
            <p style="color: var(--color-text-muted);">
              이것은 기본 스타일의 카드 컴포넌트입니다. 경계선이 있고 배경색이 적용됩니다.
            </p>
          </VCard>

          <VCard variant="elevated">
            <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium); margin-bottom: var(--space-2);">
              고도가 있는 카드
            </h3>
            <p style="color: var(--color-text-muted);">
              이것은 그림자 효과가 적용된 고도가 있는 카드입니다. 더 입체적으로 보입니다.
            </p>
          </VCard>

          <VCard variant="outlined">
            <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-medium); margin-bottom: var(--space-2);">
              외곽선 카드
            </h3>
            <p style="color: var(--color-text-muted);">
              이것은 외곽선만 있는 카드입니다. 투명한 배경에 테두리만 표시됩니다.
            </p>
          </VCard>
        </div>
      </div>

      <!-- 테마 정보 -->
      <div style="margin-top: var(--space-16);">
        <VCard>
          <template #header>
            <h3 style="margin: 0;">현재 테마 정보</h3>
          </template>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4);">
            <div>
              <strong>테마 모드:</strong> {{ themeMode }}
            </div>
            <div>
              <strong>다크 모드:</strong> {{ isDark ? 'Yes' : 'No' }}
            </div>
            <div>
              <strong>시스템 다크 모드:</strong> {{ systemPrefersDark ? 'Yes' : 'No' }}
            </div>
          </div>

          <template #footer>
            <div style="display: flex; gap: var(--space-2);">
              <VButton 
                variant="ghost" 
                size="sm" 
                :style="{ backgroundColor: themeMode === 'light' ? 'var(--color-primary)' : 'transparent', color: themeMode === 'light' ? 'white' : 'var(--color-text)' }"
                @click="setTheme('light')"
              >
                라이트
              </VButton>
              <VButton 
                variant="ghost" 
                size="sm"
                :style="{ backgroundColor: themeMode === 'dark' ? 'var(--color-primary)' : 'transparent', color: themeMode === 'dark' ? 'white' : 'var(--color-text)' }"
                @click="setTheme('dark')"
              >
                다크
              </VButton>
              <VButton 
                variant="ghost" 
                size="sm"
                :style="{ backgroundColor: themeMode === 'system' ? 'var(--color-primary)' : 'transparent', color: themeMode === 'system' ? 'white' : 'var(--color-text)' }"
                @click="setTheme('system')"
              >
                시스템
              </VButton>
            </div>
          </template>
        </VCard>
      </div>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme } from '@/design-system/composables/useTheme';

const { isDark, themeMode, setTheme, toggleTheme } = useTheme();
const isLoading = ref(false);

// 개발용으로 시스템 다크 모드 상태 확인
const systemPrefersDark = computed(() => {
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
});

const testLoading = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};
</script>