<template>
  <h1>게시글 생성하기</h1>
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
      @input="handleTitleInput"
    />

    <label for="content">내용</label>
    <textarea
      id="content"
      v-model="content"
      placeholder="내용을 입력하세요."
      required
      @compositionstart="handleComposition(true)"
      @compositionend="handleComposition(false)"
      @input="handleContentInput"
    />

    <button type="submit" :disabled="isEmptyValue">생성하기</button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useModal, usePost } from '@/composables';

const title = ref('');
const content = ref('');
const isComposing = ref(false);

const isEmptyValue = computed(
  () => title.value.trim().length === 0 || content.value.trim().length === 0
);

const router = useRouter();
const { showAlert } = useModal();
const { createNewPost } = usePost();

async function handleCreate() {
  if (isEmptyValue.value) {
    showAlert('제목과 내용을 모두 입력해주세요.');
    return;
  }

  try {
    await createNewPost(title.value, content.value);
    showAlert('게시글이 생성되었습니다.');
    router.push('/board');
  } catch (error) {
    console.error('게시글 생성 실패:', error);
    showAlert('게시글 생성 중 오류가 발생했습니다.');
  }
}

/** input 입력 핸들러 */
async function handleTitleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  await nextTick();
  title.value = target.value;
}

/** textarea 입력 핸들러 */
async function handleContentInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  await nextTick();
  content.value = target.value;
}

/** 문자 조합 핸들러 */
const handleComposition = (value: boolean) => {
  isComposing.value = value;
};
</script>
