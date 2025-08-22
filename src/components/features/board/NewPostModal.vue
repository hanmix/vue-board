<template>
  <transition name="fade">
    <teleport to="body">
      <dialog
        v-if="isVisible"
        class="modal-overlay"
        @click.self="emit('onClose')"
      >
        <div class="modal-content">
          <button type="button" class="modal-close" @click="close" aria-label="모달 닫기">×</button>
          <h1>게시글 작성하기</h1>
          <form @submit.prevent="handleCreate" class="modal-form">
            <label for="title">제목</label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="제목을 입력하세요."
              required
              @compositionstart="handleComposition(true)"
              @compositionend="handleComposition(false)"
            />

            <label for="content">내용</label>
            <textarea
              id="content"
              v-model="content"
              placeholder="내용을 입력하세요."
              required
              @compositionstart="handleComposition(true)"
              @compositionend="handleComposition(false)"
            />

            <button type="submit" :disabled="isEmptyValue">생성하기</button>
          </form>
        </div>
      </dialog>
    </teleport>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { useModal, usePost } from '@/composables';

const title = ref('');
const content = ref('');
const isComposing = ref(false);

const isEmptyValue = computed(
  () => title.value.trim().length === 0 || content.value.trim().length === 0
);

const { showAlert, isVisible, close } = useModal();
const { createNewPost } = usePost();

const emit = defineEmits(['onClose', 'onCreate', 'onUpdate']);

async function handleCreate() {
  if (isEmptyValue.value) {
    showAlert('제목과 내용을 모두 입력해주세요.');
    return;
  }

  try {
    await createNewPost(title.value, content.value);
    nextTick(() => {
      title.value = '';
      content.value = '';
    });
    emit('onUpdate');
  } catch (error) {
    console.error('게시글 생성 실패:', error);
    showAlert('게시글 생성 중 오류가 발생했습니다.');
  }
}

/** 문자 조합 핸들러 */
const handleComposition = (value: boolean) => {
  isComposing.value = value;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);

  // lazy loading된 컴포넌트가 마운트될 때 이미 모달이 열려있다면 포커스 적용
  if (isVisible.value) {
    nextTick(() => {
      title.value = '';
      content.value = '';
      const titleInput = document.getElementById('title') as HTMLInputElement;
      titleInput?.focus();
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
