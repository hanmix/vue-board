<template>
  <VModal
    :modelValue="isVisible"
    @update:modelValue="handleClose"
    title="게시글 작성하기"
    size="md"
  >
    <form @submit.prevent="handleCreate" class="post-form">
      <div class="form-field">
        <label for="title" class="form-label">제목</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="form-input"
          placeholder="제목을 입력하세요."
          required
          @compositionstart="handleComposition(true)"
          @compositionend="handleComposition(false)"
        />
      </div>

      <div class="form-field">
        <label for="content" class="form-label">내용</label>
        <textarea
          id="content"
          v-model="content"
          class="form-textarea"
          placeholder="내용을 입력하세요."
          required
          rows="6"
          @compositionstart="handleComposition(true)"
          @compositionend="handleComposition(false)"
        />
      </div>
    </form>

    <template #footer>
      <div class="modal-actions">
        <VButton variant="ghost" @click="handleClose"> 취소 </VButton>
        <VButton
          variant="primary"
          :disabled="isEmptyValue"
          @click="handleCreate"
        >
          생성하기
        </VButton>
      </div>
    </template>
  </VModal>
</template>

<script setup lang="ts">
import './NewPostModal.css';
import { ref, computed, nextTick, onMounted } from 'vue';
import { usePost, useModal } from '@/composables';
import { VModal, VButton } from '@/design-system/components/base';
import { useToast } from '@/design-system/composables';

const title = ref('');
const content = ref('');
const isComposing = ref(false);

const isEmptyValue = computed(
  () => title.value.trim().length === 0 || content.value.trim().length === 0
);

const { showError, showWarning } = useToast();
const { isVisible, hideModal } = useModal();
const { createNewPost } = usePost();

const emit = defineEmits(['onClose', 'onCreate', 'onUpdate']);

const handleClose = () => {
  hideModal();
  emit('onClose');
};

async function handleCreate() {
  if (isEmptyValue.value) {
    showWarning('제목과 내용을 모두 입력해주세요.');
    return;
  }

  try {
    await createNewPost(title.value, content.value);
    nextTick(() => {
      title.value = '';
      content.value = '';
    });
    emit('onUpdate');
    handleClose();
  } catch (error) {
    console.error('게시글 생성 실패:', error);
    showError('게시글 생성 중 오류가 발생했습니다.');
  }
}

const handleComposition = (value: boolean) => {
  isComposing.value = value;
};

onMounted(() => {
  if (isVisible.value) {
    nextTick(() => {
      title.value = '';
      content.value = '';
      const titleInput = document.getElementById('title') as HTMLInputElement;
      titleInput?.focus();
    });
  }
});
</script>
