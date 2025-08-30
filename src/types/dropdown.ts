// src/types/dropdown.ts

/**
 * 드롭다운 식별자 타입
 * 새로운 드롭다운 추가 시 여기에 ID를 추가해야 함
 */
export type DropdownId = 'user-profile-dropdown' | 'search-filter-dropdown';

/**
 * 드롭다운 ID 상수 객체 (자동완성 및 리팩토링 지원)
 */
export const DROPDOWN_IDS = {
  USER_PROFILE: 'user-profile-dropdown',
  SEARCH_FILTER: 'search-filter-dropdown',
} as const satisfies Record<string, DropdownId>;

/**
 * 드롭다운 우선순위 매핑
 */
export const DROPDOWN_PRIORITIES: Record<DropdownId, 'normal' | 'high'> = {
  'user-profile-dropdown': 'high',
  'search-filter-dropdown': 'normal',
} as const;

/**
 * 드롭다운 설명 매핑 (디버깅 및 문서화용)
 */
export const DROPDOWN_DESCRIPTIONS: Record<DropdownId, string> = {
  'user-profile-dropdown': '사용자 프로필 메뉴',
  'search-filter-dropdown': '검색 타입 선택',
} as const;

/**
 * 드롭다운 ID 유효성 검사
 */
export const isValidDropdownId = (id: string | undefined): id is DropdownId => {
  if (!id) return false;
  return Object.values(DROPDOWN_IDS).includes(id as DropdownId);
};

/**
 * 안전한 드롭다운 ID 반환 (undefined 체크 포함)
 */
export const safeDropdownId = (
  id: DropdownId | undefined
): DropdownId | null => {
  return id && isValidDropdownId(id) ? id : null;
};
