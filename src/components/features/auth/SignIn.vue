<template>
  <VContainer class="auth-page" centerContent>
    <div class="auth-container">
      <VCard variant="elevated" padding="lg" class="auth-card">
        <template #header>
          <div class="auth-header">
            <h1 class="auth-title">로그인</h1>
            <p class="auth-subtitle">안녕하세요. 싱글벙글 게시판 입니다.</p>
          </div>
        </template>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-field">
            <label for="email" class="form-label">이메일</label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              class="form-input"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div class="form-field">
            <label for="password" class="form-label">비밀번호</label>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="form-input"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <VButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            block
            class="auth-submit"
          >
            {{ loading ? '로그인 중...' : '로그인' }}
          </VButton>

          <p v-if="error" class="error-message">{{ error }}</p>
        </form>

        <template #footer>
          <div class="auth-footer">
            <p class="auth-footer-text">아직 아이디가 없으신가요?</p>
            <VButton variant="ghost" @click="$router.push('/signUp')">
              회원가입
            </VButton>
          </div>
        </template>
      </VCard>
    </div>
  </VContainer>
</template>

<script lang="ts" setup>
import './SignIn.css';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables';
import { useToast } from '@/design-system/composables';
import { VContainer, VCard, VButton } from '@/design-system/components';
import { onMounted } from 'vue';

const router = useRouter();
const { showSuccess, showError } = useToast();
const { email, password, loading, error, isAuthenticated, login } = useAuth();

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    if (isAuthenticated.value) {
      showSuccess('로그인 되었습니다.');
      router.push('/board');
    } else {
      throw error.value;
    }
  } catch {
    showError('로그인 중 오류가 발생했습니다.');
  }
};

onMounted(() => {
  const titleInput = document.getElementById('email');
  if (titleInput) {
    titleInput.focus();
  }
});
</script>
