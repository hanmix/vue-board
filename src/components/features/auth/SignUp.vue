<template>
  <VContainer class="sign-up-page" centerContent>
    <div class="sign-up-container">
      <VCard variant="elevated" padding="lg" class="sign-up-card">
        <template #header>
          <div class="sign-up-header">
            <h1 class="sign-up-title">회원가입</h1>
            <p class="sign-up-subtitle">Vue Board 계정을 만들어보세요</p>
          </div>
        </template>

        <form @submit.prevent="handleSignUp" class="sign-up-form">
          <div class="sign-up-field">
            <label for="name" class="sign-up-label">이름</label>
            <input
              id="name"
              type="text"
              v-model="name"
              required
              class="sign-up-input"
              placeholder="이름을 입력해주세요"
            />
          </div>

          <div class="sign-up-field">
            <label for="email" class="sign-up-label">이메일</label>
            <div class="sign-up-input-group">
              <input
                id="email"
                type="email"
                v-model="email"
                required
                class="sign-up-input sign-up-input-grouped"
                placeholder="이메일을 입력해주세요"
              />
              <VButton
                type="button"
                variant="secondary"
                size="sm"
                @click="checkedEmail"
                class="sign-up-input-button"
              >
                중복확인
              </VButton>
            </div>
          </div>

          <div class="sign-up-field">
            <label for="password" class="sign-up-label">비밀번호</label>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="sign-up-input"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>

          <div class="sign-up-field">
            <label for="doublePassword" class="sign-up-label">비밀번호 확인</label>
            <input
              id="doublePassword"
              type="password"
              v-model="doubleCheckPassword"
              required
              class="sign-up-input"
              :class="{
                'sign-up-input-error': doubleCheckPassword && !isPasswordMatch,
              }"
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <p
              v-if="doubleCheckPassword && !isPasswordMatch"
              class="field-error"
            >
              비밀번호가 일치하지 않습니다
            </p>
          </div>

          <VButton
            type="submit"
            variant="primary"
            size="lg"
            block
            class="sign-up-submit"
          >
            회원가입 하기
          </VButton>
        </form>

        <template #footer>
          <div class="sign-up-footer">
            <p class="sign-up-footer-text">이미 아이디가 있으신가요?</p>
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
import './SignUp.css';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables';
import { useToast } from '@/design-system/composables';
import { VContainer, VCard, VButton } from '@/design-system/components';

const router = useRouter();
const { showSuccess, showError, showWarning } = useToast();
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
      showWarning('이름을 입력해주세요.');
      return;
    case isEmptyEmail.value:
      showWarning('이메일을 입력해주세요.');
      return;
    case isEmptyPassword.value:
      showWarning('비밀번호를 입력해주세요.');
      return;
    case isEmptyDoubleCheckPassword.value:
      showWarning('비밀번호를 다시 확인해주세요.');
      return;
    case !isPasswordMatch.value:
      showError('비밀번호가 맞지 않습니다.');
      return;
  }

  try {
    await register(email.value, password.value, name.value);
    if (isAuthenticated) {
      showSuccess('회원가입이 완료되었습니다.');
      router.push('/signIn');
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
    showError('회원가입 중 오류가 발생했습니다.');
  }
};
</script>
