# Vue Board 디자인 시스템 - UI 디자이너 에이전트 참조 가이드

## 개요

이 디자인 시스템은 Vue Board 프로젝트를 위한 **Flat 2.0 + Subtle Depth + Adaptive Tokens** 접근 방식을 따르며, 유지보수성, 확장성 및 최신 UI 트렌드를 우선시합니다.

---

## 디자인 원칙

### 핵심 철학

- **Flat 2.0**: 깔끔하고 심플한 스타일, 최소한의 장식 요소
- **Subtle Depth**: 그림자와 레이어링을 통한 미묘한 깊이감
- **Adaptive Tokens**: 라이트/다크 모드와 브랜딩을 위한 유연한 토큰 시스템
- **접근성 우선**: WCAG AA+ 색상 대비 요구사항 충족

---

## 디자인 토큰 시스템

### 색상 토큰

```css
/* 주요 색상 */
--color-primary: #4f46e5
--color-primary-hover: #4338ca
--color-secondary: #f59e0b

/* 배경 토큰 */
--color-bg-light: #ffffff
--color-bg-dark: #1e1e2f
--color-surface-light: #f9fafb
--color-surface-dark: #2a2a40

/* 텍스트 토큰 */
--color-text-light: #111827
--color-text-dark: #f5f5f5
--color-text-muted-light: #6b7280
--color-text-muted-dark: #a1a1aa

/* 의미적 색상 */
--color-success: #22c55e
--color-danger: #ef4444
--color-warning: #facc15
--color-info: #3b82f6
```

### 타이포그래피 토큰

```css
/* 폰트 패밀리 */
--font-family-sans: 'Inter', 'Noto Sans KR', sans-serif

/* 폰트 크기 */
--font-size-xs: 12px    /* 작은 라벨 */
--font-size-sm: 14px    /* 작은 본문 텍스트 */
--font-size-md: 16px    /* 기본 본문 텍스트 */
--font-size-lg: 20px    /* 소제목 */
--font-size-xl: 24px    /* 제목 */
--font-size-2xl: 32px   /* 큰 제목 */

/* 폰트 굵기 및 줄 높이 */
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-bold: 700
--line-height-base: 1.5
```

### 간격 및 레이아웃 토큰

```css
/* 간격 스케일 */
--space-1: 4px     /* 밀착 간격 */
--space-2: 8px     /* 작은 간격 */
--space-3: 12px    /* 중간-작은 간격 */
--space-4: 16px    /* 기본 간격 */
--space-6: 24px    /* 큰 간격 */
--space-8: 32px    /* 매우 큰 간격 */

/* 브레이크포인트 */
--breakpoint-sm: 480px   /* 모바일 */
--breakpoint-md: 768px   /* 태블릿 */
--breakpoint-lg: 1024px  /* 데스크톱 */
--breakpoint-xl: 1440px  /* 대형 데스크톱 */
```

### 시각적 효과 토큰

```css
/* 모서리 둥글기 */
--radius-sm: 6px      /* 작은 요소 */
--radius-md: 12px     /* 기본 요소 */
--radius-lg: 20px     /* 큰 카드/모달 */

/* 그림자 시스템 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.15)    /* 미묘한 깊이 */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.2)     /* 표준 깊이 */
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.25)  /* 강조된 깊이 */
```

---

## 레이아웃 시스템

### 그리드 시스템

- **12컬럼 그리드** 반응형 레이아웃 지원
- **브레이크포인트별 컨테이너 최대 너비** 설정
- **간격 책임 분리**:
  - `margin`: 컴포넌트 간 간격
  - `padding`: 내부 콘텐츠 간격
  - `gap`: Flex/Grid 아이템 간격

### 레이아웃 패턴

1. **헤더 + 콘텐츠** (기본 앱 구조)
2. **사이드바 + 메인** (대시보드 레이아웃)
3. **그리드 카드** (게시판/피드 레이아웃)
4. **분할 뷰** (2컬럼 레이아웃)

### 반응형 그리드 구현

```css
.layout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* 태블릿: 2컬럼 */
@media (min-width: var(--breakpoint-md)) {
  .layout-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 데스크톱: 3컬럼 */
@media (min-width: var(--breakpoint-lg)) {
  .layout-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 컴포넌트 명세

### 버튼 컴포넌트

**변형**: `primary`, `secondary`, `ghost`
**주요 속성**:

- 폰트: `var(--font-family-sans)`
- 크기: `var(--font-size-md)`
- 패딩: `var(--space-2) var(--space-4)`
- 모서리 둥글기: `var(--radius-md)`
- 그림자: `var(--shadow-sm)` (호버: `var(--shadow-md)`)
- 전환 효과: `background 0.2s, box-shadow 0.2s`

**색상 매핑**:

- Primary: `var(--color-primary)` / `var(--color-primary-hover)`
- Secondary: `var(--color-secondary)`
- Ghost: `transparent` 배경

### 카드 컴포넌트

**주요 속성**:

- 배경: `var(--color-surface-dark)`
- 모서리 둥글기: `var(--radius-lg)`
- 그림자: `var(--shadow-md)`
- 패딩: `var(--space-4)`

### 모달 컴포넌트

**주요 속성**:

- 오버레이: `rgba(0, 0, 0, 0.5)` 배경
- 컨테이너: `var(--color-surface-dark)` 배경
- 모서리 둥글기: `var(--radius-lg)`
- 그림자: `var(--shadow-lg)`
- 패딩: `var(--space-6)`
- 최대 너비: `600px`

---

## 적응형 토큰 전략

### 테마 지원

- **자동 라이트/다크 모드**: `prefers-color-scheme` 사용
- **브랜드 유연성**: 주요/보조 색상 변경으로 전체 테마 업데이트
- **디바이스 반응형**: Container Queries + 브레이크포인트 활용

### 구현 가이드라인

1. **플랫 + 미묘한 깊이**: 그림자를 통한 계층적 레이어링
2. **토큰 기반 스케일링**: 모든 측정값은 디자인 토큰 사용
3. **접근성 준수**: WCAG AA+ 대비율 유지
4. **유지보수 가능한 아키텍처**: 토큰 변경 시 전역 적용
5. **적응형 디자인**: 테마와 디바이스에 유연하게 대응

---

## 에이전트 사용 지침

### 컴포넌트 생성 시:

1. **항상 디자인 토큰 사용** (하드코딩된 값 금지)
2. **간격 스케일 준수** (일관된 리듬감 유지)
3. **적절한 그림자 레벨 적용** (시각적 계층 구조)
4. **의미적 색상 토큰 사용** (성공, 위험 등의 의미 전달)
5. **정의된 브레이크포인트로 반응형 구현**

### 컴포넌트 체크리스트:

- [ ] 모든 색상이 CSS 커스텀 프로퍼티 참조
- [ ] 간격이 사전 정의된 스케일 사용 (`--space-*`)
- [ ] 타이포그래피가 토큰 시스템 준수
- [ ] 그림자가 일관되게 적용
- [ ] 반응형 동작 정의됨
- [ ] 접근성 요구사항 충족
- [ ] 호버/포커스 상태 구현

### 토큰 수정 프로세스:

1. **적절한 토큰 카테고리 식별**
2. **루트 CSS 커스텀 프로퍼티 업데이트**
3. **컴포넌트 전반의 연쇄 효과 검증**
4. **라이트/다크 모드 호환성 테스트**
5. **접근성 준수 검증**

---

## 빠른 참조

### 자주 사용하는 토큰:

- **주요 액션**: `var(--color-primary)`
- **기본 간격**: `var(--space-4)`
- **본문 텍스트**: `var(--font-size-md)`
- **표준 그림자**: `var(--shadow-md)`
- **기본 둥글기**: `var(--radius-md)`

### 반응형 브레이크포인트:

- **모바일 우선**: 단일 컬럼부터 시작
- **태블릿 (768px+)**: 2컬럼 레이아웃
- **데스크톱 (1024px+)**: 3+ 컬럼 레이아웃
- **대형 (1440px+)**: 최대 콘텐츠 너비

---

## 컴포넌트 사용 예시

### 기본 버튼 구현

```vue
<template>
  <button :class="['btn', `btn-${variant}`]" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant: 'primary' | 'secondary' | 'ghost';
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
});

const emit = defineEmits<{
  click: [];
}>();

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.btn {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-text-dark);
  box-shadow: var(--shadow-sm);
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-text-dark);
  border: 1px solid var(--color-text-muted-dark);
}
</style>
```

### 반응형 카드 그리드

```vue
<template>
  <div class="card-grid">
    <Card v-for="item in items" :key="item.id" class="card-item">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </Card>
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  padding: var(--space-4);
}

@media (min-width: var(--breakpoint-md)) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

@media (min-width: var(--breakpoint-lg)) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card-item h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-2);
  color: var(--color-text-dark);
}

.card-item p {
  font-size: var(--font-size-md);
  color: var(--color-text-muted-dark);
  line-height: var(--line-height-base);
}
</style>
```

---

## 주의사항

### 금지 사항:

- ❌ 하드코딩된 색상값 (`#4f46e5` 대신 `var(--color-primary)` 사용)
- ❌ 임의의 간격값 (`20px` 대신 `var(--space-6)` 사용)
- ❌ 과도한 그라디언트나 장식적 효과
- ❌ 복잡한 시각적 노이즈나 불필요한 장식

### 권장 사항:

- ✅ 모든 스타일링에서 디자인 토큰 활용
- ✅ 그림자를 통한 자연스러운 깊이감 표현
- ✅ 플랫한 배경색과 명확한 경계선
- ✅ 컴포넌트별 명확한 책임 분리
- ✅ 접근성 가이드라인 준수
- ✅ 반응형 디자인 우선 고려
- ✅ 일관된 시각적 계층 구조 유지
