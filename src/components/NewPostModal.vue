<template>
  <teleport to="body">
    <dialog v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <h1>게시글 작성하기</h1>
        <form
          @submit.prevent="handleCreate"
          style="display: flex; flex-direction: column; gap: 10px"
        >
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
          <button type="button" @click="emit('onClose')">닫기</button>
        </form>
      </div>
    </dialog>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { useModal, usePost } from '@/composables';

const title = ref('');
const content = ref('');
const isComposing = ref(false);

const isEmptyValue = computed(
  () => title.value.trim().length === 0 || content.value.trim().length === 0
);

const { showAlert } = useModal();
const { createNewPost } = usePost();

const { isVisible } = defineProps<{
  isVisible: boolean;
}>();
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
    // showAlert('게시글이 생성되었습니다.');
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
    emit('onClose');
  }
};

/** 모달 오픈 시 입력창 초기화 및 제목 입력창 포커스 */
watch(
  () => isVisible,
  async visible => {
    if (visible) {
      await nextTick(() => {
        title.value = '';
        content.value = '';
      });
      const titleInput = document.getElementById('title') as HTMLInputElement;
      titleInput?.focus();
    }
  }
);

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
