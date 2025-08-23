<template>
  <VContainer class="auth-page" centerContent>
    <div class="auth-container">
      <VCard variant="elevated" padding="lg" class="auth-card">
        <template #header>
          <div class="auth-header">
            <h1 class="auth-title">회원가입</h1>
            <p class="auth-subtitle">Vue Board 계정을 만들어보세요</p>
          </div>
        </template>

        <form @submit.prevent="handleSignUp" class="auth-form">
          <div class="form-field">
            <label for="name" class="form-label">이름</label>
            <input
              id="name"
              type="text"
              v-model="name"
              required
              class="form-input"
              placeholder="이름을 입력해주세요"
            />
          </div>

          <div class="form-field">
            <label for="email" class="form-label">이메일</label>
            <div class="form-input-group">
              <input
                id="email"
                type="email"
                v-model="email"
                required
                class="form-input form-input-grouped"
                placeholder="이메일을 입력해주세요"
              />
              <VButton 
                type="button" 
                variant="secondary" 
                size="sm" 
                @click="checkedEmail"
                class="form-input-button"
              >
                중복확인
              </VButton>
            </div>
          </div>

          <div class="form-field">
            <label for="password" class="form-label">비밀번호</label>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="form-input"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>

          <div class="form-field">
            <label for="doublePassword" class="form-label">비밀번호 확인</label>
            <input
              id="doublePassword"
              type="password"
              v-model="doubleCheckPassword"
              required
              class="form-input"
              :class="{ 'form-input-error': doubleCheckPassword && !isPasswordMatch }"
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <p v-if="doubleCheckPassword && !isPasswordMatch" class="field-error">
              비밀번호가 일치하지 않습니다
            </p>
          </div>

          <VButton 
            type="submit" 
            variant="primary" 
            size="lg" 
            block
            class="auth-submit"
          >
            회원가입 하기
          </VButton>
        </form>

        <template #footer>
          <div class="auth-footer">
            <p class="auth-footer-text">이미 아이디가 있으신가요?</p>
            <VButton variant="ghost" @click="$router.push('/signIn')">
              로그인
            </VButton>
          </div>
        </template>
      </VCard>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useModal, useAuth } from '@/composables';

const router = useRouter();
const { showAlert } = useModal();
const {
  name,
  email,
  password,
  doubleCheckPassword,
  isEmptyName,
  isEmptyEmail,
  isEmptyPassword,
  isEmptyDoubleCheckPassword,
  isPasswordMatch,
  isAuthenticated,
} = useAuth();
const { register } = useAuth();

// TODO: 이메일 중복 확인 API 수정 시 삭제
const checkedEmail = async () => {
  if (isEmptyEmail.value) return;

  // try {
  //   await userStore.emailChecker(email.value);
  //   if (userStore.isAvailableId) {
  //     showAlert('사용 가능한 이메일 입니다.');
  //   } else {
  //     showAlert('이미 사용중인 이메일 입니다.');
  //   }
  // } catch (error) {
  //   console.error('Error during id-check:', error);
  // }
};

const handleSignUp = async () => {
  switch (true) {
    case isEmptyName.value:
      showAlert('이름을 입력해주세요.');
      return;
    case isEmptyEmail.value:
      showAlert('이메일을 입력해주세요.');
      return;
    case isEmptyPassword.value:
      showAlert('비밀번호를 입력해주세요.');
      return;
    case isEmptyDoubleCheckPassword.value:
      showAlert('비밀번호를 다시 확인해주세요.');
      return;
    case !isPasswordMatch.value:
      showAlert('비밀번호가 맞지 않습니다.');
      return;
  }

  try {
    await register(email.value, password.value, name.value);
    if (isAuthenticated) {
      showAlert('회원가입이 완료되었습니다.');
      router.push('/signIn');
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
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
  max-width: 440px;
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

.form-input-error {
  border-color: var(--color-danger) !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

/* Input Group */
.form-input-group {
  display: flex;
  gap: var(--space-2);
  align-items: stretch;
}

.form-input-grouped {
  flex: 1;
}

.form-input-button {
  flex-shrink: 0;
  white-space: nowrap;
}

/* Field Error */
.field-error {
  color: var(--color-danger);
  font-size: var(--font-size-xs);
  margin: 0;
  padding-top: var(--space-1);
}

.auth-submit {
  margin-top: var(--space-2);
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
  
  .form-input-group {
    flex-direction: column;
  }
  
  .form-input-button {
    align-self: stretch;
  }
}
</style>
