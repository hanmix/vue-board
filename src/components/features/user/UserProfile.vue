<template>
  <main class="user-profile-page">
    <!-- 탭 네비게이션 -->
    <nav class="profile-tabs" role="tablist" aria-label="프로필 설정 탭">
      <button
        v-for="tab in profileTabs"
        :key="tab.id"
        :class="getTabClass(tab)"
        :aria-selected="activeTab === tab.id"
        role="tab"
        @click="activeTab = tab.id"
      >
        <VIcon :name="tab.icon" size="sm" />
        <span>{{ tab.label }}</span>
      </button>
    </nav>

    <!-- 탭 컨텐츠 -->
    <div class="profile-content">
      <!-- 기본 정보 탭 -->
      <section v-if="activeTab === 'profile'" class="tab-section">
        <VCard variant="outlined" padding="md">
          <template #header>
            <div class="section-header">
              <VIcon name="user" />
              <h2>기본 정보</h2>
            </div>
          </template>

          <div class="profile-info">
            <div class="info-item">
              <label>사용자 ID</label>
              <span>{{
                currentUserFromAuth?.id || currentUser?.id || '미설정'
              }}</span>
            </div>
            <div class="info-item" v-if="currentUser?.email">
              <label>이메일</label>
              <span>{{ currentUser.email }}</span>
            </div>
            <div class="info-item" v-if="currentUser?.name">
              <label>이름</label>
              <span>{{ currentUser.name }}</span>
            </div>
            <div class="info-item">
              <label>가입일</label>
              <span>{{ formatJoinDate() }}</span>
            </div>
          </div>
        </VCard>
      </section>

      <!-- 보안 설정 탭 -->
      <section v-if="activeTab === 'security'" class="tab-section">
        <VCard variant="outlined" padding="md">
          <template #header>
            <div class="section-header">
              <VIcon name="shield" />
              <h2>보안 설정</h2>
            </div>
          </template>

          <div class="security-options">
            <div class="option-item">
              <div class="option-info">
                <h3>비밀번호 변경</h3>
                <p>계정 보안을 위해 정기적으로 비밀번호를 변경하세요</p>
              </div>
              <VButton
                variant="secondary"
                size="sm"
                @click="handlePasswordChange"
              >
                변경하기
              </VButton>
            </div>

            <div class="option-item">
              <div class="option-info">
                <h3>로그인 기록</h3>
                <p>최근 로그인 활동을 확인하세요</p>
              </div>
              <VButton
                variant="secondary"
                size="sm"
                @click="handleLoginHistory"
              >
                확인하기
              </VButton>
            </div>
          </div>
        </VCard>
      </section>

      <!-- 알림 설정 탭 -->
      <section v-if="activeTab === 'notifications'" class="tab-section">
        <VCard variant="outlined" padding="md">
          <template #header>
            <div class="section-header">
              <VIcon name="bell" />
              <h2>알림 설정</h2>
            </div>
          </template>

          <div class="notification-options">
            <div class="option-item">
              <div class="option-info">
                <h3>댓글 알림</h3>
                <p>내 게시글에 댓글이 달렸을 때 알림을 받습니다</p>
              </div>
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  v-model="notificationSettings.comments"
                />
                <span class="slider"></span>
              </label>
            </div>

            <div class="option-item">
              <div class="option-info">
                <h3>답글 알림</h3>
                <p>내 댓글에 답글이 달렸을 때 알림을 받습니다</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notificationSettings.replies" />
                <span class="slider"></span>
              </label>
            </div>

            <div class="option-item">
              <div class="option-info">
                <h3>시스템 알림</h3>
                <p>중요한 시스템 공지사항을 받습니다</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" v-model="notificationSettings.system" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </VCard>
      </section>

      <!-- 테마 설정 탭 -->
      <section v-if="activeTab === 'theme'" class="tab-section">
        <VCard variant="outlined" padding="md">
          <template #header>
            <div class="section-header">
              <VIcon name="palette" />
              <h2>테마 설정</h2>
            </div>
          </template>

          <div class="theme-options">
            <h3>화면 모드 선택</h3>
            <div class="theme-buttons">
              <button
                :class="getThemeButtonClass('light')"
                @click="setTheme('light')"
                class="theme-option"
              >
                <VIcon name="sun" size="lg" />
                <span class="theme-name">라이트 모드</span>
                <span class="theme-desc">밝은 테마로 화면을 표시합니다</span>
              </button>

              <button
                :class="getThemeButtonClass('dark')"
                @click="setTheme('dark')"
                class="theme-option"
              >
                <VIcon name="moon" size="lg" />
                <span class="theme-name">다크 모드</span>
                <span class="theme-desc">어두운 테마로 화면을 표시합니다</span>
              </button>

              <button
                :class="getThemeButtonClass('system')"
                @click="setTheme('system')"
                class="theme-option"
              >
                <VIcon name="monitor" size="lg" />
                <span class="theme-name">시스템 모드</span>
                <span class="theme-desc"
                  >시스템 설정에 따라 자동 변경됩니다</span
                >
              </button>
            </div>
          </div>
        </VCard>
      </section>

      <!-- 개인정보 탭 -->
      <section v-if="activeTab === 'privacy'" class="tab-section">
        <VCard variant="outlined" padding="md">
          <template #header>
            <div class="section-header">
              <VIcon name="lock" />
              <h2>개인정보 관리</h2>
            </div>
          </template>

          <div class="privacy-options">
            <div class="option-item">
              <div class="option-info">
                <h3>개인정보 내보내기</h3>
                <p>내가 작성한 게시글과 댓글 데이터를 내보낼 수 있습니다</p>
              </div>
              <VButton variant="secondary" size="sm" @click="handleDataExport">
                데이터 내보내기
              </VButton>
            </div>

            <div class="option-item danger">
              <div class="option-info">
                <h3>계정 탈퇴</h3>
                <p>
                  계정을 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다
                </p>
              </div>
              <VButton
                variant="danger"
                size="sm"
                @click="handleAccountDeletion"
              >
                계정 탈퇴
              </VButton>
            </div>
          </div>
        </VCard>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import './UserProfile.css';
import { useUser, useAuth } from '@/composables';
import { computed, onMounted, ref } from 'vue';
import { VButton, VCard, VIcon } from '@/design-system/components';
import { useTheme } from '@/design-system/composables';
import { useToast } from '@/design-system/composables';

const { currentUser, getUserById } = useUser();
const { getCurrentUser } = useAuth();
const { themeMode, setTheme } = useTheme();
const { showToast } = useToast();

const currentUserFromAuth = computed(() => getCurrentUser());

// 탭 관리
const activeTab = ref('profile');

const profileTabs = [
  { id: 'profile', label: '기본 정보', icon: 'user' },
  { id: 'security', label: '보안 설정', icon: 'shield' },
  { id: 'notifications', label: '알림 설정', icon: 'bell' },
  { id: 'theme', label: '테마 설정', icon: 'palette' },
  { id: 'privacy', label: '개인정보', icon: 'lock' },
];

// 알림 설정
const notificationSettings = ref({
  comments: true,
  replies: true,
  system: true,
});

// 탭 클래스
const getTabClass = (tab: any) => ({
  'profile-tab': true,
  'profile-tab--active': activeTab.value === tab.id,
});

// 테마 버튼 클래스
const getThemeButtonClass = (theme: string) => ({
  'theme-option': true,
  'theme-option--active': themeMode.value === theme,
});

// 가입일 포맷
const formatJoinDate = () => {
  // JWT에서 iat (issued at) 정보가 있다면 사용, 없으면 기본값
  const user = currentUserFromAuth.value as any;
  if (user?.iat) {
    return new Date(user.iat * 1000).toLocaleDateString('ko-KR');
  }
  return '정보 없음';
};

// 이벤트 핸들러
const handlePasswordChange = () => {
  showToast('비밀번호 변경 기능은 준비 중입니다.', 'info');
};

const handleLoginHistory = () => {
  showToast('로그인 기록 조회 기능은 준비 중입니다.', 'info');
};

const handleDataExport = () => {
  showToast('데이터 내보내기 기능은 준비 중입니다.', 'info');
};

const handleAccountDeletion = () => {
  const confirmed = confirm(
    '정말로 계정을 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
  );
  if (confirmed) {
    showToast('계정 탈퇴 기능은 준비 중입니다.', 'warning');
  }
};

const setData = async () => {
  // JWT에서 기본 정보를 우선 사용하고, 추가 정보가 필요하면 API 호출
  if (currentUserFromAuth.value?.id) {
    await getUserById();
  }
};

onMounted(async () => {
  await setData();
});
</script>
