<template>
  <component
    :is="is"
    class="v-dropdown-item"
    :class="itemClasses"
    :disabled="disabled"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeydown"
    role="menuitem"
    :tabindex="disabled ? -1 : 0"
  >
    <span v-if="$slots.icon" class="v-dropdown-item__icon">
      <slot name="icon" />
    </span>
    
    <span class="v-dropdown-item__content">
      <slot />
    </span>
    
    <span v-if="$slots.suffix" class="v-dropdown-item__suffix">
      <slot name="suffix" />
    </span>
  </component>
</template>

<script setup lang="ts">
import './VDropdownItem.css';
import { computed } from 'vue';

export interface DropdownItemProps {
  disabled?: boolean;
  active?: boolean;
  destructive?: boolean;
  href?: string;
  to?: string | object;
  target?: string;
}

const props = withDefaults(defineProps<DropdownItemProps>(), {
  disabled: false,
  active: false,
  destructive: false,
});

const emit = defineEmits<{
  'click': [event: MouseEvent];
}>();

const is = computed(() => {
  if (props.to) return 'router-link';
  if (props.href) return 'a';
  return 'button';
});

const itemClasses = computed(() => [
  {
    'v-dropdown-item--active': props.active,
    'v-dropdown-item--destructive': props.destructive,
    'v-dropdown-item--disabled': props.disabled,
  }
]);

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (!props.disabled) {
      (event.target as HTMLElement).click();
    }
  }
};
</script>

