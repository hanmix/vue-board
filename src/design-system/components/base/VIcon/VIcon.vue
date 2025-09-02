<template>
  <svg
    :class="iconClasses"
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-label="ariaLabel"
    role="img"
    v-html="iconPath"
  ></svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import './VIcon.css';

export interface VIconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  strokeWidth?: number;
  color?: string;
  ariaLabel?: string;
  class?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>;
}

const props = withDefaults(defineProps<VIconProps>(), {
  size: 'md',
  strokeWidth: 2,
  color: 'currentColor',
});

// 크기 매핑
const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

// 아이콘 패스 매핑
const iconPaths = {
  'chevron-left': '<polyline points="15,18 9,12 15,6" />',
  'chevron-right': '<polyline points="9,18 15,12 9,6" />',
  edit: `
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  `,
  trash: `
    <polyline points="3,6 5,6 21,6"/>
    <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
  `,
  eye: `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  `,
  'thumbs-up': `
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  `,
  'thumbs-down': `
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
  `,
  'message-circle': '<path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>',
  reply: `
    <polyline points="9,17 4,12 9,7"/>
    <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
  `,
  'chevrons-left': `
    <polyline points="11,17 6,12 11,7"/>
    <polyline points="18,17 13,12 18,7"/>
  `,
  'chevrons-right': `
    <polyline points="13,17 18,12 13,7"/>
    <polyline points="6,17 11,12 6,7"/>
  `,
  'first-page': `
    <polygon points="19,20 9,12 19,4"/>
    <line x1="5" y1="19" x2="5" y2="5"/>
  `,
  'last-page': `
    <polygon points="5,4 15,12 5,20"/>
    <line x1="19" y1="5" x2="19" y2="19"/>
  `,
  search: `
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  `,
  'chevron-down': '<polyline points="6,9 12,15 18,9"/>',
  pencil: `
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  `,
  success: `
    <polyline points="20,6 9,17 4,12"/>
  `,
  warning: `
    <triangle points="7.86,2 16.14,2 22,13.76 2,13.76"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  `,
  error: `
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  `,
  info: `
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  `,
  close: `
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  `,
  gear: `
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06c.46-.46.6-1.14.33-1.82a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.7 0 1.31-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06c.46.46 1.14.6 1.82.33.61-.25 1-0.86 1-1.56V3a2 2 0 1 1 4 0v.09c0 .7.39 1.31 1 1.56.68.27 1.36.13 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82c.25.61.86 1 1.56 1H21a2 2 0 1 1 0 4h-.09c-.7 0-1.31.39-1.51 1z"/>
  `,
  // UserProfile 전용 아이콘들
  user: `
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  `,
  shield: `
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  `,
  bell: `
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  `,
  palette: `
    <circle cx="13.5" cy="6.5" r=".5"/>
    <circle cx="17.5" cy="10.5" r=".5"/>
    <circle cx="8.5" cy="7.5" r=".5"/>
    <circle cx="6.5" cy="12.5" r=".5"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  `,
  lock: `
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <circle cx="12" cy="16" r="1"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  `,
  sun: `
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  `,
  moon: `
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  `,
  monitor: `
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  `,
};

const iconSize = computed(() => {
  if (typeof props.size === 'number') return props.size;
  return sizeMap[props.size];
});

const iconPath = computed(() => {
  const path = iconPaths[props.name as keyof typeof iconPaths];
  if (!path) {
    console.warn(`VIcon: Unknown icon name "${props.name}"`);
    return '';
  }
  return path;
});

const iconClasses = computed(() => ['v-icon', props.class]);

const ariaLabel = computed(() => props.ariaLabel || `${props.name} icon`);
</script>
