// =================================================================
// CONSTANTS - 전역 상수 및 설정값
// =================================================================

/**
 * 반응형 브레이크포인트 상수
 * CSS와 JavaScript에서 일관되게 사용
 */
export const BREAKPOINTS = {
  // 모바일 (0px ~ 767px)
  MOBILE_MAX: 767,
  
  // 태블릿 (768px ~ 1023px)
  TABLET_MIN: 768,
  TABLET_MAX: 1023,
  
  // 데스크탑 (1024px 이상)
  DESKTOP_MIN: 1024,
  
  // 특수 케이스
  SMALL_MOBILE_MAX: 480, // 작은 모바일
  IPHONE_SE_MAX: 375,    // iPhone SE
} as const;

/**
 * 현재 화면 크기 유형을 반환하는 유틸리티 함수들
 * @deprecated 이 함수들은 정적 계산만 수행합니다. 반응형 자동 계산을 위해서는 useBreakpoint() 컴포저블을 사용하세요.
 */
export const getDeviceType = () => {
  const width = window.innerWidth;
  
  if (width <= BREAKPOINTS.MOBILE_MAX) return 'mobile';
  if (width <= BREAKPOINTS.TABLET_MAX) return 'tablet';
  return 'desktop';
};

export const isMobile = () => window.innerWidth <= BREAKPOINTS.MOBILE_MAX;
export const isTablet = () => 
  window.innerWidth >= BREAKPOINTS.TABLET_MIN && 
  window.innerWidth <= BREAKPOINTS.TABLET_MAX;
export const isDesktop = () => window.innerWidth >= BREAKPOINTS.DESKTOP_MIN;
export const isSmallMobile = () => window.innerWidth <= BREAKPOINTS.SMALL_MOBILE_MAX;
export const isIPhoneSE = () => window.innerWidth <= BREAKPOINTS.IPHONE_SE_MAX;

/**
 * 스페이싱 상수 (CSS 변수와 동일한 값)
 */
export const SPACING = {
  XS: 4,    // --spacing-xs
  SM: 8,    // --spacing-sm
  MD: 16,   // --spacing-md
  LG: 24,   // --spacing-lg
  XL: 32,   // --spacing-xl
  XXL: 48,  // --spacing-2xl
} as const;

/**
 * 터치 타겟 크기
 */
export const TOUCH_TARGET = 44; // --touch-target (4.4rem)

/**
 * Z-Index 레이어
 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;