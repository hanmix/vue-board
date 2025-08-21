<template>
  <Transition name="fade">
    <div v-if="visible" class="modal-overlay" @click="handleDimClick">
      <div class="modal-content" @click.stop>
        <header class="modal-header">
          <slot name="header">
            <h3>{{ title }}</h3>
          </slot>
          <button class="modal-close" @click="close">×</button>
        </header>
        <section class="modal-body">
          <slot />
        </section>
        <footer class="modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

interface Props {
  visible: boolean;
  title?: string;
  closeOnDim?: boolean;
  closeOnEsc?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  closeOnDim: true,
  closeOnEsc: true,
});

const emit = defineEmits<{
  (e: 'update:visible', v: boolean): void;
  (e: 'close'): void;
}>();

const close = () => {
  emit('update:visible', false);
  emit('close');
};

const handleDimClick = () => {
  if (props.closeOnDim) close();
};

const handleEsc = (e: KeyboardEvent) => {
  if (props.closeOnEsc && e.key === 'Escape') close();
};

onMounted(() => document.addEventListener('keydown', handleEsc));
onBeforeUnmount(() => document.removeEventListener('keydown', handleEsc));
</script>

