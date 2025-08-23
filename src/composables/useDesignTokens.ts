/**
 * Design Tokens Composable for Vue Board v2.0
 * 디자인 토큰에 대한 타입 안전한 접근을 제공
 */

import { computed, ref, type Ref } from 'vue'

// =============
// TYPE DEFINITIONS
// =============

export type ColorToken = 
  | 'primary' | 'secondary' | 'tertiary' | 'elevated' | 'hover'
  | 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'disabled'
  | 'primary' | 'secondary'
  | 'default' | 'hover' | 'active' | 'disabled'
  | 'success' | 'error' | 'warning' | 'info'
  | 'default' | 'subtle' | 'strong' | 'interactive'

export type SpacingToken = 
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24'
  | 'xs' | 'sm' | 'md' | 'lg'
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type SizeToken = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export type RadiusToken = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export type ShadowToken = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl'

export type TransitionToken = 'fast' | 'base' | 'slow'

export type ContainerToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'default' | 'fluid'

// =============
// DESIGN TOKENS COMPOSABLE
// =============

export const useDesignTokens = () => {
  // Theme state
  const currentTheme = ref<'dark' | 'light'>('dark')

  // Color tokens
  const colors = {
    bg: {
      primary: 'var(--color-bg-primary)',
      secondary: 'var(--color-bg-secondary)',
      tertiary: 'var(--color-bg-tertiary)',
      elevated: 'var(--color-bg-elevated)',
      hover: 'var(--color-bg-hover)',
    },
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      tertiary: 'var(--color-text-tertiary)',
      inverse: 'var(--color-text-inverse)',
      disabled: 'var(--color-text-disabled)',
    },
    brand: {
      primary: 'var(--color-brand-primary)',
      secondary: 'var(--color-brand-secondary)',
    },
    interactive: {
      default: 'var(--color-interactive-default)',
      hover: 'var(--color-interactive-hover)',
      active: 'var(--color-interactive-active)',
      disabled: 'var(--color-interactive-disabled)',
    },
    status: {
      success: 'var(--color-status-success)',
      error: 'var(--color-status-error)',
      warning: 'var(--color-status-warning)',
      info: 'var(--color-status-info)',
    },
    border: {
      default: 'var(--color-border-default)',
      subtle: 'var(--color-border-subtle)',
      strong: 'var(--color-border-strong)',
      interactive: 'var(--color-border-interactive)',
    },
  } as const

  // Spacing tokens
  const spacing = {
    // Base spacing
    0: 'var(--spacing-0)',
    1: 'var(--spacing-1)',
    2: 'var(--spacing-2)',
    3: 'var(--spacing-3)',
    4: 'var(--spacing-4)',
    5: 'var(--spacing-5)',
    6: 'var(--spacing-6)',
    8: 'var(--spacing-8)',
    10: 'var(--spacing-10)',
    12: 'var(--spacing-12)',
    16: 'var(--spacing-16)',
    20: 'var(--spacing-20)',
    24: 'var(--spacing-24)',
    
    // Semantic spacing
    component: {
      xs: 'var(--spacing-component-xs)',
      sm: 'var(--spacing-component-sm)',
      md: 'var(--spacing-component-md)',
      lg: 'var(--spacing-component-lg)',
    },
    section: {
      xs: 'var(--spacing-section-xs)',
      sm: 'var(--spacing-section-sm)',
      md: 'var(--spacing-section-md)',
      lg: 'var(--spacing-section-lg)',
      xl: 'var(--spacing-section-xl)',
    },
  } as const

  // Typography tokens
  const typography = {
    fontFamily: {
      primary: 'var(--font-family-primary)',
      mono: 'var(--font-family-mono)',
    },
    fontSize: {
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
      '3xl': 'var(--font-size-3xl)',
      '4xl': 'var(--font-size-4xl)',
    },
    fontWeight: {
      light: 'var(--font-weight-light)',
      normal: 'var(--font-weight-normal)',
      medium: 'var(--font-weight-medium)',
      semibold: 'var(--font-weight-semibold)',
      bold: 'var(--font-weight-bold)',
      extrabold: 'var(--font-weight-extrabold)',
    },
    lineHeight: {
      tight: 'var(--line-height-tight)',
      normal: 'var(--line-height-normal)',
      loose: 'var(--line-height-loose)',
    },
  } as const

  // Layout tokens
  const layout = {
    container: {
      xs: 'var(--container-xs)',
      sm: 'var(--container-sm)',
      md: 'var(--container-md)',
      lg: 'var(--container-lg)',
      xl: 'var(--container-xl)',
      '2xl': 'var(--container-2xl)',
    },
    header: {
      height: 'var(--layout-header-height)',
    },
    content: {
      maxWidth: 'var(--layout-content-max-width)',
      padding: 'var(--layout-content-padding)',
    },
    zIndex: {
      dropdown: 'var(--z-index-dropdown)',
      sticky: 'var(--z-index-sticky)',
      fixed: 'var(--z-index-fixed)',
      overlay: 'var(--z-index-overlay)',
      modal: 'var(--z-index-modal)',
      popover: 'var(--z-index-popover)',
      tooltip: 'var(--z-index-tooltip)',
      toast: 'var(--z-index-toast)',
    },
  } as const

  // Effects tokens
  const effects = {
    radius: {
      none: 'var(--radius-none)',
      sm: 'var(--radius-sm)',
      base: 'var(--radius-base)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
      '2xl': 'var(--radius-2xl)',
      full: 'var(--radius-full)',
    },
    shadow: {
      xs: 'var(--shadow-xs)',
      sm: 'var(--shadow-sm)',
      base: 'var(--shadow-base)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      xl: 'var(--shadow-xl)',
    },
    transition: {
      fast: 'var(--transition-fast)',
      base: 'var(--transition-base)',
      slow: 'var(--transition-slow)',
    },
    glass: {
      background: 'var(--glass-background)',
      border: 'var(--glass-border)',
      blur: 'var(--glass-blur)',
    },
  } as const

  // =============
  // THEME UTILITIES
  // =============

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', currentTheme.value)
  }

  const setTheme = (theme: 'dark' | 'light') => {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
  }

  const isDarkTheme = computed(() => currentTheme.value === 'dark')
  const isLightTheme = computed(() => currentTheme.value === 'light')

  // =============
  // CSS UTILITIES
  // =============

  /**
   * CSS Custom Property로부터 실제 계산된 값을 가져옴
   */
  const getComputedToken = (token: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  }

  /**
   * 컴포넌트에서 사용할 수 있는 CSS 스타일 객체 생성
   */
  const createStyles = (styleMap: Record<string, string>) => {
    return computed(() => styleMap)
  }

  /**
   * 반응형 값 생성 도우미
   */
  const createResponsiveValue = <T>(
    mobile: T,
    tablet?: T,
    desktop?: T
  ): Ref<T> => {
    const value = ref(mobile) as Ref<T>
    
    // 미디어 쿼리 감지 로직은 실제 구현에서 추가
    // 여기서는 예시로 mobile 값만 반환
    
    return value
  }

  return {
    // Tokens
    colors,
    spacing,
    typography,
    layout,
    effects,
    
    // Theme utilities
    currentTheme: readonly(currentTheme),
    isDarkTheme,
    isLightTheme,
    toggleTheme,
    setTheme,
    
    // CSS utilities
    getComputedToken,
    createStyles,
    createResponsiveValue,
  }
}

// =============
// TYPE HELPERS
// =============

/**
 * 디자인 토큰 타입 추출 유틸리티
 */
export type DesignTokens = ReturnType<typeof useDesignTokens>

/**
 * 컴포넌트에서 사용할 수 있는 색상 키 타입
 */
export type ColorKey = keyof DesignTokens['colors']['bg'] | 
                       keyof DesignTokens['colors']['text'] |
                       keyof DesignTokens['colors']['brand'] |
                       keyof DesignTokens['colors']['interactive'] |
                       keyof DesignTokens['colors']['status'] |
                       keyof DesignTokens['colors']['border']

/**
 * 간격 키 타입
 */
export type SpacingKey = keyof DesignTokens['spacing'] | 
                        keyof DesignTokens['spacing']['component'] |
                        keyof DesignTokens['spacing']['section']

// =============
// USAGE EXAMPLES
// =============

/**
 * 사용 예시:
 * 
 * // 컴포넌트에서 사용
 * const { colors, spacing, typography, effects } = useDesignTokens()
 * 
 * // 템플릿에서 직접 사용
 * <div :style="{ 
 *   backgroundColor: colors.bg.primary,
 *   padding: spacing.component.md,
 *   borderRadius: effects.radius.md 
 * }">
 * 
 * // CSS-in-JS 스타일로 사용
 * const buttonStyles = createStyles({
 *   backgroundColor: colors.brand.primary,
 *   color: colors.text.inverse,
 *   padding: `${spacing.3} ${spacing.4}`,
 *   borderRadius: effects.radius.md,
 * })
 * 
 * // 테마 토글
 * const { toggleTheme, isDarkTheme } = useDesignTokens()
 */