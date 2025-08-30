import { ref, computed, watch, onMounted } from 'vue';
import type { Ref } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'system';

// 전역 상태로 관리 (Vite HMR 친화적)
const themeMode: Ref<ThemeMode> = ref('system');
const systemPrefersDark = ref(true);

let mediaQuery: MediaQueryList | null = null;

export function useTheme() {
  const isDark = computed(() => {
    if (themeMode.value === 'system') {
      return systemPrefersDark.value;
    }
    return themeMode.value === 'dark';
  });

  const setTheme = (mode: ThemeMode) => {
    themeMode.value = mode;
    // Vite 환경에서는 localStorage 사용 최적화
    if (typeof window !== 'undefined') {
      localStorage.setItem('vue-board-theme', mode);
    }
  };

  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark');
  };

  // DOM 클래스 업데이트 (Vite 개발 환경 고려)
  const updateThemeClass = (dark: boolean) => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;

    if (dark) {
      html.classList.add('theme-dark');
      html.classList.remove('theme-light');
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.add('theme-light');
      html.classList.remove('theme-dark');
      html.setAttribute('data-theme', 'light');
    }
  };

  // 시스템 테마 감지 초기화
  const initSystemTheme = () => {
    if (typeof window === 'undefined') return;

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemPrefersDark.value = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      systemPrefersDark.value = e.matches;
    };

    // Vite 환경에서 HMR 시 이벤트 리스너 정리
    mediaQuery.removeEventListener('change', handleChange);
    mediaQuery.addEventListener('change', handleChange);
  };

  // 저장된 테마 복원
  const initTheme = () => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('vue-board-theme') as ThemeMode;
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      themeMode.value = saved;
    }
  };

  // 테마 변경 감시
  watch(isDark, updateThemeClass, { immediate: true });

  // 컴포넌트 마운트 시 초기화 (Vite SSR 고려)
  onMounted(() => {
    initSystemTheme();
    initTheme();
  });

  return {
    themeMode: computed(() => themeMode.value),
    isDark,
    setTheme,
    toggleTheme,
    initTheme,
    // 개발용 유틸리티
    __dev: import.meta.env.DEV ? { systemPrefersDark, mediaQuery } : undefined,
  };
}
