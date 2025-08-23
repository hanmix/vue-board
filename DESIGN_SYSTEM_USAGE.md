# 디자인 시스템 사용 가이드

**Vue Board v2.0 디자인 시스템 실제 사용법**

---

## 📁 **파일 구조**

```
src/assets/styles/
├── system-new/           # 새로운 디자인 시스템
│   ├── tokens.css       # 모든 디자인 토큰
│   ├── components.css   # 컴포넌트 토큰
│   └── layout.css       # 레이아웃 시스템
├── components/
│   └── system-new/      # 디자인 시스템 컴포넌트
│       ├── BaseButton.vue
│       └── BaseCard.vue
└── composables/
    └── useDesignTokens.ts # 디자인 토큰 컴포저블
```

---

## 🎯 **1. CSS 토큰 직접 사용**

### **기본 사용법**
```vue
<template>
  <div class="my-component">
    <h2 class="title">제목</h2>
    <p class="content">내용</p>
  </div>
</template>

<style scoped>
.my-component {
  /* ✅ 올바른 사용 - semantic 토큰 */
  background: var(--color-bg-elevated);
  padding: var(--spacing-component-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.title {
  /* ✅ 타이포그래피 토큰 사용 */
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-3);
}

.content {
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

/* ❌ 피해야 할 사용법 */
.bad-example {
  background: #1f1f23;  /* 하드코딩 */
  padding: 24px;        /* 하드코딩 */
  color: var(--zinc-400); /* primitive 토큰 직접 사용 */
}
</style>
```

---

## 🧩 **2. 베이스 컴포넌트 사용**

### **BaseButton 사용법**
```vue
<template>
  <!-- 기본 버튼 -->
  <BaseButton>기본 버튼</BaseButton>
  
  <!-- 다양한 variant -->
  <BaseButton variant="primary">Primary</BaseButton>
  <BaseButton variant="secondary">Secondary</BaseButton>
  <BaseButton variant="ghost">Ghost</BaseButton>
  <BaseButton variant="danger">Danger</BaseButton>
  
  <!-- 다양한 크기 -->
  <BaseButton size="sm">Small</BaseButton>
  <BaseButton size="base">Base</BaseButton>
  <BaseButton size="lg">Large</BaseButton>
  
  <!-- 아이콘과 함께 -->
  <BaseButton icon-before="→">다음</BaseButton>
  <BaseButton icon-after="↗">외부 링크</BaseButton>
  
  <!-- 로딩 상태 -->
  <BaseButton :loading="isSubmitting" @click="handleSubmit">
    저장
  </BaseButton>
  
  <!-- 링크로 렌더링 -->
  <BaseButton tag="router-link" to="/profile">
    프로필 보기
  </BaseButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/system-new/BaseButton.vue'

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // API 호출
  isSubmitting.value = false
}
</script>
```

### **BaseCard 사용법**
```vue
<template>
  <!-- 기본 카드 -->
  <BaseCard title="게시글 제목" subtitle="2024.08.23">
    <p>게시글 내용입니다.</p>
  </BaseCard>
  
  <!-- 인터랙티브 카드 -->
  <BaseCard 
    :interactive="true" 
    @click="handleCardClick"
    class="clickable-card"
  >
    <p>클릭 가능한 카드입니다.</p>
  </BaseCard>
  
  <!-- 슬롯을 활용한 커스텀 카드 -->
  <BaseCard variant="elevated" size="lg">
    <template #header>
      <div class="custom-header">
        <h3>커스텀 헤더</h3>
        <span class="badge">NEW</span>
      </div>
    </template>
    
    <div class="card-content">
      메인 콘텐츠
    </div>
    
    <template #actions>
      <BaseButton size="sm" variant="ghost">편집</BaseButton>
      <BaseButton size="sm" variant="danger">삭제</BaseButton>
    </template>
    
    <template #footer>
      <p class="meta">작성자: John Doe</p>
    </template>
  </BaseCard>
</template>
```

---

## 🎨 **3. 디자인 토큰 Composable 사용**

### **기본 사용법**
```vue
<template>
  <div :style="containerStyles">
    <button 
      :style="buttonStyles"
      @click="toggleTheme"
    >
      {{ isDarkTheme ? '🌙' : '☀️' }} 테마 전환
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDesignTokens } from '@/composables/useDesignTokens'

const { 
  colors, 
  spacing, 
  typography, 
  effects,
  isDarkTheme,
  toggleTheme 
} = useDesignTokens()

// 반응형 스타일 생성
const containerStyles = computed(() => ({
  backgroundColor: colors.bg.elevated,
  padding: spacing.component.lg,
  borderRadius: effects.radius.lg,
  boxShadow: effects.shadow.md,
}))

const buttonStyles = computed(() => ({
  backgroundColor: colors.brand.primary,
  color: colors.text.inverse,
  padding: `${spacing[3]} ${spacing[4]}`,
  borderRadius: effects.radius.md,
  border: 'none',
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  cursor: 'pointer',
  transition: effects.transition.base,
}))
</script>
```

### **고급 사용법 - 조건부 스타일링**
```vue
<template>
  <div :class="cardClasses" :style="dynamicStyles">
    <h3>동적 스타일 카드</h3>
    <p>상태에 따라 스타일이 변경됩니다.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDesignTokens } from '@/composables/useDesignTokens'

interface Props {
  variant?: 'default' | 'success' | 'error' | 'warning'
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  isActive: false,
})

const { colors, spacing, effects } = useDesignTokens()

const cardClasses = computed(() => [
  'dynamic-card',
  `dynamic-card--${props.variant}`,
  {
    'dynamic-card--active': props.isActive
  }
])

const dynamicStyles = computed(() => {
  const baseStyles = {
    padding: spacing.component.md,
    borderRadius: effects.radius.md,
    transition: effects.transition.base,
  }

  // variant에 따른 색상 변경
  switch (props.variant) {
    case 'success':
      return {
        ...baseStyles,
        backgroundColor: colors.status.success,
        color: colors.text.inverse,
      }
    case 'error':
      return {
        ...baseStyles,
        backgroundColor: colors.status.error,
        color: colors.text.inverse,
      }
    case 'warning':
      return {
        ...baseStyles,
        backgroundColor: colors.status.warning,
        color: colors.text.inverse,
      }
    default:
      return {
        ...baseStyles,
        backgroundColor: props.isActive ? colors.bg.hover : colors.bg.elevated,
        color: colors.text.primary,
      }
  }
})
</script>

<style scoped>
.dynamic-card {
  border: 1px solid v-bind('colors.border.default');
}

.dynamic-card--active {
  transform: translateY(-2px);
  box-shadow: v-bind('effects.shadow.md');
}
</style>
```

---

## 🏗️ **4. 레이아웃 시스템 사용**

### **그리드 레이아웃**
```vue
<template>
  <!-- 반응형 그리드 -->
  <div class="grid grid--responsive-3 grid--gap-md">
    <BaseCard v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
    </BaseCard>
  </div>
  
  <!-- Flexbox 레이아웃 -->
  <div class="flex flex--justify-between flex--items-center flex--gap-md">
    <h2>게시판 제목</h2>
    <BaseButton>글쓰기</BaseButton>
  </div>
  
  <!-- 스택 레이아웃 (세로 간격) -->
  <div class="stack stack--lg">
    <h1>제목</h1>
    <p>설명</p>
    <BaseButton>버튼</BaseButton>
  </div>
  
  <!-- 클러스터 레이아웃 (가로 간격) -->
  <div class="cluster cluster--sm cluster--justify-end">
    <BaseButton variant="ghost">취소</BaseButton>
    <BaseButton>확인</BaseButton>
  </div>
</template>
```

### **컨테이너 사용**
```vue
<template>
  <div class="layout-app">
    <!-- 헤더 -->
    <header class="layout-header">
      <div class="container container--default">
        <nav class="flex flex--justify-between flex--items-center">
          <h1>Vue Board</h1>
          <BaseButton>로그아웃</BaseButton>
        </nav>
      </div>
    </header>
    
    <!-- 메인 콘텐츠 -->
    <main class="layout-content">
      <div class="container container--lg">
        <router-view />
      </div>
    </main>
  </div>
</template>
```

---

## 📱 **5. 반응형 디자인 패턴**

### **반응형 그리드**
```vue
<template>
  <!-- 모바일 1열, 태블릿 2열, 데스크톱 3열 -->
  <div class="responsive-grid">
    <div v-for="item in items" :key="item.id" class="grid-item">
      {{ item.title }}
    </div>
  </div>
</template>

<style scoped>
.responsive-grid {
  display: grid;
  gap: var(--spacing-component-md);
  
  /* 모바일: 1열 */
  grid-template-columns: 1fr;
}

/* 태블릿: 2열 */
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 데스크톱: 3열 */
@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.grid-item {
  background: var(--color-bg-elevated);
  padding: var(--spacing-component-md);
  border-radius: var(--radius-md);
}
</style>
```

### **모바일 최적화**
```vue
<template>
  <div class="mobile-optimized">
    <BaseButton 
      :size="isMobile ? 'lg' : 'base'"
      :full-width="isMobile"
    >
      {{ isMobile ? '모바일 버튼' : '데스크톱 버튼' }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 768)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<style scoped>
.mobile-optimized {
  padding: var(--spacing-component-md);
}

/* iPhone SE 최적화 */
@media (max-width: 375px) {
  .mobile-optimized {
    padding: var(--spacing-component-sm);
  }
}
</style>
```

---

## ✨ **6. 고급 패턴**

### **테마 전환 애니메이션**
```vue
<template>
  <div class="theme-transition" :data-theme="currentTheme">
    <BaseButton @click="toggleTheme">
      테마 전환
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useDesignTokens } from '@/composables/useDesignTokens'

const { currentTheme, toggleTheme } = useDesignTokens()
</script>

<style scoped>
.theme-transition {
  transition: background-color var(--transition-slow), 
              color var(--transition-slow);
}

/* 테마 전환 시 부드러운 애니메이션 */
* {
  transition: background-color var(--transition-base), 
              border-color var(--transition-base);
}
</style>
```

### **동적 컴포넌트 스타일링**
```vue
<template>
  <component 
    :is="componentTag"
    :class="dynamicClasses"
    :style="computedStyles"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDesignTokens } from '@/composables/useDesignTokens'

interface Props {
  as?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  variant: 'primary',
  size: 'md',
})

const { colors, spacing, effects } = useDesignTokens()

const componentTag = computed(() => props.as)

const dynamicClasses = computed(() => [
  'dynamic-component',
  `dynamic-component--${props.variant}`,
  `dynamic-component--${props.size}`,
])

const computedStyles = computed(() => ({
  backgroundColor: props.variant === 'primary' 
    ? colors.brand.primary 
    : colors.bg.elevated,
  padding: spacing.component[props.size === 'sm' ? 'sm' : 'md'],
  borderRadius: effects.radius.md,
}))
</script>
```

---

## 🚀 **7. 실제 프로젝트 적용 예시**

### **게시글 카드 컴포넌트**
```vue
<template>
  <BaseCard 
    :interactive="true"
    variant="elevated"
    @click="goToDetail"
    class="post-card"
  >
    <template #header>
      <div class="post-header">
        <h3 class="post-title">{{ post.title }}</h3>
        <span class="post-date">{{ formatDate(post.createdAt) }}</span>
      </div>
    </template>
    
    <div class="post-content">
      {{ truncateText(post.content, 100) }}
    </div>
    
    <template #footer>
      <div class="post-meta">
        <span class="author">{{ post.author }}</span>
        <div class="post-stats">
          <span class="views">👀 {{ post.views }}</span>
          <span class="likes">❤️ {{ post.likes }}</span>
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/system-new/BaseCard.vue'
import { useDesignTokens } from '@/composables/useDesignTokens'

interface Post {
  id: number
  title: string
  content: string
  author: string
  views: number
  likes: number
  createdAt: string
}

interface Props {
  post: Post
}

const props = defineProps<Props>()

const { colors, typography, spacing } = useDesignTokens()

const goToDetail = () => {
  // 라우팅 로직
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}
</script>

<style scoped>
.post-card {
  cursor: pointer;
  transition: all var(--transition-base);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-3);
}

.post-title {
  font-size: v-bind('typography.fontSize.lg');
  font-weight: v-bind('typography.fontWeight.semibold');
  color: v-bind('colors.text.primary');
  margin: 0;
  line-height: v-bind('typography.lineHeight.tight');
}

.post-date {
  font-size: v-bind('typography.fontSize.sm');
  color: v-bind('colors.text.tertiary');
  white-space: nowrap;
}

.post-content {
  color: v-bind('colors.text.secondary');
  line-height: v-bind('typography.lineHeight.normal');
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: v-bind('typography.fontSize.sm');
  color: v-bind('colors.text.tertiary');
}

.post-stats {
  display: flex;
  gap: var(--spacing-4);
}
</style>
```

이제 디자인 시스템이 완전히 구축되었습니다! 🎉

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "\ub514\uc790\uc778 \uc2dc\uc2a4\ud15c \ud1a0\ud070 \ubc0f \uad6c\uc870 \uc815\uc758", "status": "completed"}, {"content": "\ub514\uc790\uc778 \uc2dc\uc2a4\ud15c \ubb38\uc11c\ud654 (\uac1c\ubc1c\uc790 \ucc38\uace0\uc6a9)", "status": "completed"}, {"content": "\uc2e4\uc81c CSS \ud30c\uc77c\ub85c \uad6c\ud604", "status": "completed"}, {"content": "Vue \ucef4\ud3ec\ub10c\ud2b8 \uc608\uc2dc \uc791\uc131", "status": "completed"}]