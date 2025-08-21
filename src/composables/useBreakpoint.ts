import { ref, computed, onMounted, onUnmounted, readonly } from 'vue';
import { BREAKPOINTS } from '@/utils/constants';

/**
 * 반응형 브레이크포인트 컴포저블
 * 화면 크기 변화를 자동으로 감지하고 업데이트
 */
export const useBreakpoint = () => {
  // 현재 화면 너비 (반응형)
  const windowWidth = ref(0);
  
  // 브레이크포인트 상태 (computed)
  const isMobile = computed(() => windowWidth.value <= BREAKPOINTS.MOBILE_MAX);
  const isTablet = computed(() => 
    windowWidth.value >= BREAKPOINTS.TABLET_MIN && 
    windowWidth.value <= BREAKPOINTS.TABLET_MAX
  );
  const isDesktop = computed(() => windowWidth.value >= BREAKPOINTS.DESKTOP_MIN);
  const isSmallMobile = computed(() => windowWidth.value <= BREAKPOINTS.SMALL_MOBILE_MAX);
  const isIPhoneSE = computed(() => windowWidth.value <= BREAKPOINTS.IPHONE_SE_MAX);
  
  // 현재 디바이스 타입 (computed)
  const deviceType = computed(() => {
    if (isMobile.value) return 'mobile';
    if (isTablet.value) return 'tablet';
    return 'desktop';
  });
  
  // 브레이크포인트 객체 (모든 상태를 하나의 객체로)
  const breakpoint = computed(() => ({
    isMobile: isMobile.value,
    isTablet: isTablet.value,
    isDesktop: isDesktop.value,
    isSmallMobile: isSmallMobile.value,
    isIPhoneSE: isIPhoneSE.value,
    deviceType: deviceType.value,
    width: windowWidth.value,
  }));
  
  // 윈도우 리사이즈 핸들러
  const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
  };
  
  // 초기화 및 이벤트 리스너 등록
  onMounted(() => {
    updateWindowWidth(); // 초기값 설정
    window.addEventListener('resize', updateWindowWidth);
  });
  
  // 정리
  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
  });
  
  return {
    // 반응형 상태
    windowWidth: readonly(windowWidth),
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    isIPhoneSE,
    deviceType,
    breakpoint,
    
    // 유틸리티 함수 (호환성을 위해 유지)
    getCurrentDeviceType: () => deviceType.value,
    getCurrentWidth: () => windowWidth.value,
  };
};

// 글로벌 인스턴스 (선택적 사용)
let globalBreakpointInstance: ReturnType<typeof useBreakpoint> | null = null;

/**
 * 글로벌 브레이크포인트 인스턴스 반환
 * 여러 컴포넌트에서 동일한 인스턴스를 공유하고 싶을 때 사용
 */
export const useGlobalBreakpoint = () => {
  if (!globalBreakpointInstance) {
    globalBreakpointInstance = useBreakpoint();
  }
  return globalBreakpointInstance;
};