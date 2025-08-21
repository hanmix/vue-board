# 다크 UI 디자이너 - Vue Board 프로젝트

이 문서는 Vue Board 프로젝트의 다크 테마 디자인 시스템과 UI 컴포넌트에 대한 가이드입니다.

## 🎨 디자인 시스템 개요

Vue Board 프로젝트는 **모던 다크 테마**를 기반으로 하며, **글래스모피즘(Glassmorphism)**과 **그라데이션 효과**를 활용한 세련된 UI를 제공합니다.

### 주요 디자인 철학

- **다크 모드 우선**: 모든 UI 요소는 다크 모드를 기준으로 설계
- **글래스모피즘**: 반투명 효과와 backdrop-filter를 활용한 모던한 느낌
- **미니멀 디자인**: 간결하고 깔끔한 인터페이스
- **반응형 디자인**: 모바일 우선(Mobile-first) 접근법
- **접근성 고려**: 키보드 네비게이션과 고대비 모드 지원

## 🎯 컬러 시스템

### 배경색 (Background Colors)

```css
--color-bg: #18181b              /* 메인 배경색 */
--color-bg-light: #27272a        /* 밝은 배경색 */
--color-bg-lighter: #3f3f46      /* 더 밝은 배경색 */
--color-bg-card: #1f1f23         /* 카드 배경색 */
--color-bg-hover: #2a2a2e        /* 호버 상태 배경색 */
```

### 텍스트 색상 (Text Colors)

```css
--color-text: #e4e4e7           /* 기본 텍스트 */
--color-text-secondary: #a1a1aa /* 보조 텍스트 */
--color-text-strong: #fafafa    /* 강조 텍스트 */
--color-text-muted: #71717a     /* 비활성 텍스트 */
--color-text-dark: #52525b      /* 어두운 텍스트 */
```

### 주색상 (Primary Colors)

```css
--color-primary: #60a5fa         /* 메인 브랜드 색상 */
--color-primary-hover: #3b82f6   /* 호버 상태 */
--color-primary-light: rgba(96, 165, 250, 0.1) /* 투명도 적용 */
--color-primary-disabled: #52525b /* 비활성 상태 */
```

### 보조 색상 (Secondary & Accent Colors)

```css
--color-secondary: #8b5cf6       /* 보조 색상 (퍼플) */
--color-accent-red: #f87171      /* 빨간색 강조 */
--color-accent-green: #22c55e    /* 초록색 강조 */
--color-accent-yellow: #facc15   /* 노란색 강조 */
--color-accent-orange: #fb923c   /* 주황색 강조 */
```

### 상태 색상 (Status Colors)

```css
--color-success: #10b981    /* 성공 */
--color-error: #ef4444      /* 오류 */
--color-warning: #f59e0b    /* 경고 */
--color-info: #06b6d4       /* 정보 */
```

## 🏗️ 레이아웃 시스템

### 간격 (Spacing System)

```css
--spacing-xs: 0.4rem    /* 4px */
--spacing-sm: 0.8rem    /* 8px */
--spacing-md: 1.6rem    /* 16px */
--spacing-lg: 2.4rem    /* 24px */
--spacing-xl: 3.2rem    /* 32px */
--spacing-2xl: 4.8rem   /* 48px */
--spacing-3xl: 6.4rem   /* 64px */
```

### 보더 반경 (Border Radius)

```css
--border-radius-sm: 0.4rem   /* 4px */
--border-radius-md: 0.6rem   /* 6px */
--border-radius-lg: 0.8rem   /* 8px */
--border-radius-xl: 1.2rem   /* 12px */
--border-radius-full: 9999px /* 완전한 원형 */
```

### 그림자 (Shadows)

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.2)
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.3)
```

## 📱 반응형 브레이크포인트

```css
--bp-mobile: 375px    /* 모바일 */
--bp-tablet: 768px    /* 태블릿 */
--bp-desktop: 1024px  /* 데스크톱 */
--bp-wide: 1200px     /* 와이드 스크린 */
```

## 🧩 핵심 컴포넌트

### 1. 네비게이션 헤더 (Navigation Header)

**특징:**

- 글래스모피즘 효과 (`backdrop-filter: blur(20px)`)
- 스티키 포지셔닝
- 그라데이션 텍스트 효과
- 반응형 레이아웃

**주요 스타일:**

```css
.header {
  background: rgba(24, 24, 27, 0.85);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
}

.header h1 {
  background: linear-gradient(
    135deg,
    var(--color-text-strong) 0%,
    var(--color-primary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 2. 게시글 카드 (Post Cards)

**특징:**

- 카드 기반 그리드 레이아웃
- 호버 애니메이션 효과
- 글래스모피즘 배경
- 그라데이션 오버레이

**주요 스타일:**

```css
.post-item {
  background: var(--color-bg-card);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
}

.post-item::before {
  background: linear-gradient(
    135deg,
    rgba(96, 165, 250, 0.05) 0%,
    rgba(139, 92, 246, 0.05) 100%
  );
}

.post-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(96, 165, 250, 0.1);
}
```

### 3. 폼 요소 (Form Elements)

**특징:**

- 일관된 터치 타겟 크기 (`--touch-target: 4.4rem`)
- 부드러운 트랜지션 효과
- 포커스 상태 시각적 피드백
- 접근성 고려된 디자인

**주요 스타일:**

```css
button {
  min-height: var(--touch-target);
  background: var(--color-primary);
  transition: all var(--transition-normal);
}

button:hover {
  box-shadow: 0 2px 8px rgba(96, 165, 250, 0.2);
}

button:focus {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
```

### 4. 모달 (Modal)

**특징:**

- 반투명 오버레이
- 중앙 정렬
- 키보드 및 터치 이벤트 관리
- 반응형 크기 조정

**주요 스타일:**

```css
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: var(--color-bg-lighter);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
}
```

### 5. 검색 필터 (Search Filter)

**특징:**

- 인라인 라벨과 입력 필드 통합
- 드롭다운 포털 기능
- 반응형 크기 조정
- 부드러운 애니메이션

**주요 스타일:**

```css
.inline-search-container {
  background: var(--color-bg-light);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
}

.inline-search-container:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}
```

## ⚙️ 트랜지션 시스템

```css
--transition-fast: 0.15s ease     /* 빠른 애니메이션 */
--transition-normal: 0.3s ease    /* 일반 애니메이션 */
--transition-slow: 0.5s ease      /* 느린 애니메이션 */
```

## 🎪 특수 효과

### 글래스모피즘 (Glassmorphism)

- `backdrop-filter: blur()` 속성 활용
- 반투명 배경색과 조합
- 모던하고 세련된 느낌 연출

### 그라데이션 효과

- 선형 그라데이션을 텍스트와 배경에 활용
- 브랜드 색상을 기반으로 한 조화로운 색상 조합
- 호버 상태에서 미묘한 그라데이션 오버레이

### 마이크로 인터랙션

- 호버 시 `transform: translateY(-2px)` 효과
- 부드러운 box-shadow 변화
- 색상 전환 애니메이션

## 📱 모바일 최적화

### 터치 친화적 디자인

- 최소 터치 타겟 크기: 44px (`--touch-target`)
- 적절한 여백과 간격
- 터치 피드백 제거 (`-webkit-tap-highlight-color: transparent`)

### 반응형 그리드

- 모바일: 1열 레이아웃
- 태블릿: 2열 자동 조정
- 데스크톱: 3열+ 최적화

## 🔧 접근성 (Accessibility)

### 키보드 네비게이션

- 모든 인터랙티브 요소에 포커스 표시
- 논리적인 탭 순서
- 적절한 ARIA 레이블

### 모션 접근성

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 고대비 모드

```css
@media (prefers-contrast: high) {
  :root {
    --color-border: #666666;
    --color-text: #ffffff;
    --color-bg: #000000;
  }
}
```

## 💡 디자인 패턴 가이드라인

### 카드 컴포넌트 생성 시

1. `var(--color-bg-card)` 배경색 사용
2. `backdrop-filter: blur(10px)` 적용
3. 호버 시 `translateY(-2px)` 효과
4. 그라데이션 오버레이 추가 고려

### 버튼 컴포넌트 생성 시

1. 최소 높이: `var(--touch-target)`
2. 기본 색상: `var(--color-primary)`
3. 호버 시 그림자 효과 추가
4. 포커스 아웃라인 필수

### 폼 입력 요소 생성 시

1. 일관된 패딩과 테두리 스타일
2. 포커스 시 브랜드 색상 테두리
3. 플레이스홀더는 `var(--color-text-muted)` 사용
4. 에러 상태는 `var(--color-error)` 활용

## 🚀 향후 확장 가능한 요소

### 라이트 모드 지원

현재는 다크 모드 전용이지만, 향후 라이트 모드 지원을 위해 CSS 변수 기반 구조 유지

### 테마 커스터마이징

사용자별 테마 색상 변경을 위한 동적 CSS 변수 업데이트 지원

### 추가 컴포넌트

- 토스트 알림
- 프로그레스 바
- 탭 네비게이션
- 드래그 앤 드롭 인터페이스

---

**최종 업데이트:** 2025년 8월
**프로젝트 버전:** Vue 3 + TypeScript
**디자인 시스템 버전:** 1.0
