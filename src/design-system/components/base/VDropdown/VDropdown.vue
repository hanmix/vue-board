<template>
  <div ref="triggerRef" class="v-dropdown-trigger" @click="toggle">
    <slot name="trigger" :is-open="isOpen" :toggle="toggle"></slot>
  </div>

  <Teleport to="body">
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        ref="menuRef"
        class="v-dropdown-menu"
        :class="menuClasses"
        :style="menuStyle"
        role="menu"
        :aria-label="ariaLabel"
      >
        <slot name="menu" :close="close"></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import './VDropdown.css';
import { ref, reactive, computed, onBeforeUnmount, nextTick } from 'vue';

export interface DropdownProps {
  closeOnScroll?: boolean;
  placement?:
    | 'bottom-start'
    | 'bottom-end'
    | 'bottom-center'
    | 'top-start'
    | 'top-end'
    | 'top-center';
  verticalOffset?: number;
  horizontalOffset?: number;
  mobileFullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<DropdownProps>(), {
  closeOnScroll: true,
  placement: 'bottom-start',
  verticalOffset: 20,
  horizontalOffset: 13,
  mobileFullWidth: true,
  size: 'md',
  disabled: false,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
  open: [];
  close: [];
}>();

const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);
const menuStyle = reactive<Record<string, string>>({});

const menuClasses = computed(() => [
  `v-dropdown-menu--${props.size}`,
  {
    'v-dropdown-menu--mobile-full': props.mobileFullWidth,
  },
]);

let scrollTimer: ReturnType<typeof setTimeout> | null = null;

const toggle = async () => {
  if (props.disabled) return;

  isOpen.value = !isOpen.value;
  emit('update:open', isOpen.value);

  if (isOpen.value) {
    emit('open');
    await nextTick();
    updateMenuPosition();
    bindListeners();
  } else {
    emit('close');
    unbindListeners();
  }
};

const close = () => {
  if (isOpen.value) {
    isOpen.value = false;
    emit('update:open', false);
    emit('close');
    unbindListeners();
  }
};

const updateMenuPosition = () => {
  const trigger = triggerRef.value;
  if (!trigger) return;

  const rect = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Reset styles
  Object.keys(menuStyle).forEach(key => {
    delete menuStyle[key];
  });

  menuStyle.position = 'fixed';
  menuStyle.zIndex = 'var(--z-dropdown)';

  // Check if mobile
  const isMobile = viewportWidth <= 768;

  if (isMobile && props.mobileFullWidth) {
    // Mobile: full width with margins
    menuStyle.left = 'var(--space-4)';
    menuStyle.right = 'var(--space-4)';
    menuStyle.width = 'auto';

    // Position based on available space
    const spaceBelow = viewportHeight - rect.bottom - props.verticalOffset;
    const spaceAbove = rect.top - props.verticalOffset;

    if (spaceBelow >= 200 || spaceBelow >= spaceAbove) {
      menuStyle.top = `${rect.bottom + props.verticalOffset}px`;
    } else {
      menuStyle.bottom = `${
        viewportHeight - rect.top + props.verticalOffset
      }px`;
    }
  } else {
    // Desktop: positioned relative to trigger
    const menuWidth = Math.max(200, rect.width);

    // Horizontal positioning
    let leftPos = rect.left;

    switch (props.placement) {
      case 'bottom-start':
      case 'top-start':
        leftPos = rect.left - props.horizontalOffset;
        break;
      case 'bottom-end':
      case 'top-end':
        leftPos = rect.right - menuWidth;
        break;
      case 'bottom-center':
      case 'top-center':
        leftPos = rect.left + (rect.width - menuWidth) / 2;
        break;
    }

    // Prevent overflow
    const rightEdge = leftPos + menuWidth;
    if (rightEdge > viewportWidth - 16) {
      leftPos = viewportWidth - menuWidth - 16;
    }
    if (leftPos < 16) {
      leftPos = 16;
    }

    menuStyle.left = `${leftPos}px`;
    menuStyle.minWidth = `${menuWidth}px`;

    // Vertical positioning
    const isTopPlacement = props.placement.startsWith('top');
    if (isTopPlacement) {
      menuStyle.bottom = `${
        viewportHeight - rect.top + props.verticalOffset
      }px`;
    } else {
      menuStyle.top = `${rect.bottom + props.verticalOffset}px`;
    }
  }
};

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node;
  if (
    menuRef.value &&
    !menuRef.value.contains(target) &&
    triggerRef.value &&
    !triggerRef.value.contains(target)
  ) {
    close();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close();
  }
};

const handleResize = () => {
  if (isOpen.value) {
    updateMenuPosition();
  }
};

const handleScroll = () => {
  if (!isOpen.value) return;

  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  scrollTimer = setTimeout(() => {
    if (isOpen.value) {
      if (props.closeOnScroll) {
        close();
      } else {
        updateMenuPosition();
      }
    }
    scrollTimer = null;
  }, 16); // 60fps
};

const bindListeners = () => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('resize', handleResize);
  document.addEventListener('scroll', handleScroll, true);
};

const unbindListeners = () => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('scroll', handleScroll, true);

  if (scrollTimer) {
    clearTimeout(scrollTimer);
    scrollTimer = null;
  }
};

// Expose methods
defineExpose({
  isOpen,
  toggle,
  close,
  updatePosition: updateMenuPosition,
});

onBeforeUnmount(() => {
  unbindListeners();
});
</script>
