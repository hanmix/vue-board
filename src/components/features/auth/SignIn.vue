<template>
  <VContainer class="auth-page" centerContent>
    <div class="auth-container">
      <VCard variant="elevated" padding="lg" class="auth-card">
        <template #header>
          <div class="auth-header">
            <h1 class="auth-title">로그인</h1>
            <p class="auth-subtitle">Vue Board에 오신 것을 환영합니다</p>
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
import { useRouter } from 'vue-router';
import { useAuth, useModal } from '@/composables';

const router = useRouter();
const { showAlert } = useModal();
const { email, password, loading, error, isAuthenticated, login } = useAuth();

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    if (isAuthenticated) {
      showAlert('로그인 되었습니다.');
      router.push('/board');
    } else {
      showAlert('아이디 또는 비밀번호가 틀렸습니다.');
    }
  } catch (error) {
    showAlert('로그인 중 오류가 발생했습니다.');
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) 0;
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

.auth-card {
  box-shadow: var(--shadow-xl);
}

/* Header */
.auth-header {
  text-align: center;
}

.auth-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0 0 var(--space-2) 0;
}

.auth-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  margin: 0;
}

/* Form */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.form-input {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.auth-submit {
  margin-top: var(--space-2);
}

.error-message {
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  text-align: center;
  margin: 0;
  padding: var(--space-3);
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius-base);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* Footer */
.auth-footer {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.auth-footer-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .auth-page {
    padding: var(--space-4);
  }
  
  .auth-container {
    max-width: none;
  }
  
  .auth-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
