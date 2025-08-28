<template>
  <div class="container">
    <h1>🎭 중첩 Transition 완전 분석</h1>

    <!-- 경고 메시지 -->
    <div class="warning">
      <strong>⚠️ 주의사항:</strong> 중첩 transition은 타이밍과 순서가
      중요합니다. 잘못 설정하면 애니메이션이 겹치거나 끊어질 수 있어요!
    </div>

    <!-- 1. 정상 작동하는 중첩 transition -->
    <div class="example-section">
      <div class="example-title">
        ✅ 1. 올바른 중첩 Transition (지연시간 활용)
      </div>
      <div class="controls">
        <button @click="showNested1 = !showNested1">
          {{ showNested1 ? '숨기기' : '보이기' }}
        </button>
      </div>
      <div class="success">
        각 레벨마다 서로 다른 지연시간(delay)을 설정하여 순차적으로 애니메이션이
        실행됩니다.
      </div>

      <div class="demo-area">
        <div class="status">순차 실행</div>
        <transition name="outer-fade">
          <div v-if="showNested1" class="outer-container">
            <h3>외부 컨테이너 (0.8초 fade + scale)</h3>
            <transition name="inner-slide">
              <div v-if="showNested1" class="inner-container">
                <p>내부 컨테이너 (0.6초 slide, 0.3초 지연)</p>
                <transition name="content-bounce">
                  <div v-if="showNested1" class="content-box">
                    최종 컨텐츠 (0.8초 bounce, 0.6초 지연)
                  </div>
                </transition>
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <!-- 2. 문제가 있는 케이스 -->
    <div class="example-section">
      <div class="example-title">
        ❌ 2. 문제가 있는 중첩 Transition (동시 실행)
      </div>
      <div class="controls">
        <button @click="showProblem = !showProblem">
          {{ showProblem ? '숨기기' : '보이기' }}
        </button>
      </div>
      <div class="warning">
        모든 애니메이션이 동시에 실행되어 부자연스럽거나 서로 간섭할 수
        있습니다.
      </div>

      <div class="demo-area">
        <div class="status">동시 실행</div>
        <transition name="problem-outer">
          <div v-if="showProblem" class="outer-container">
            <h3>외부 (fade)</h3>
            <transition name="problem-inner">
              <div v-if="showProblem" class="inner-container">
                내부 (scale) - 동시 실행으로 어색함
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <!-- 3. 해결책: 계단식 지연 -->
    <div class="example-section">
      <div class="example-title">✅ 3. 해결책: 계단식 지연 애니메이션</div>
      <div class="controls">
        <button @click="showSolution = !showSolution">
          {{ showSolution ? '숨기기' : '보이기' }}
        </button>
      </div>
      <div class="success">
        transition-delay를 활용하여 부모가 어느 정도 진행된 후 자식 애니메이션이
        시작됩니다.
      </div>

      <div class="demo-area">
        <div class="status">계단식</div>
        <transition name="solution-outer">
          <div v-if="showSolution" class="outer-container">
            <h3>외부 (0.8초)</h3>
            <transition name="solution-inner">
              <div v-if="showSolution" class="inner-container">
                내부 (0.6초, 0.3초 지연)
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <!-- 4. 개별 제어 방식 -->
    <div class="example-section">
      <div class="example-title">✅ 4. 개별 제어 방식</div>
      <div class="controls">
        <button @click="showOuter = !showOuter">외부 토글</button>
        <button @click="showInner = !showInner" :disabled="!showOuter">
          내부 토글
        </button>
      </div>
      <div class="success">
        각 transition을 독립적으로 제어하여 더 정확한 애니메이션 컨트롤이
        가능합니다.
      </div>

      <div class="demo-area">
        <div class="status">개별 제어</div>
        <transition name="individual-outer">
          <div v-if="showOuter" class="outer-container">
            <h3>외부 컨테이너</h3>
            <p>
              내부 토글 버튼으로 안쪽 애니메이션을 별도로 제어할 수 있습니다.
            </p>
            <transition name="individual-inner">
              <div v-if="showInner" class="inner-container">
                독립적으로 제어되는 내부 컨테이너
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <!-- 5. JavaScript 훅으로 정밀 제어 -->
    <div class="example-section">
      <div class="example-title">✅ 5. JavaScript 훅으로 정밀 제어</div>
      <div class="controls">
        <button @click="showJsControl = !showJsControl">
          {{ showJsControl ? '숨기기' : '보이기' }}
        </button>
      </div>
      <div class="success">
        JavaScript 훅을 사용하여 중첩 애니메이션의 타이밍을 완전히 제어합니다.
      </div>

      <div class="demo-area">
        <div class="status">JS 제어</div>
        <transition
          @before-enter="beforeEnterOuter"
          @enter="enterOuter"
          @leave="leaveOuter"
          :css="false"
        >
          <div v-if="showJsControl" class="outer-container" ref="outerRef">
            <h3>JS 제어 외부</h3>
            <transition
              @before-enter="beforeEnterInner"
              @enter="enterInner"
              @leave="leaveInner"
              :css="false"
            >
              <div v-if="showJsControl" class="inner-container" ref="innerRef">
                완전 JS 제어 내부
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <!-- 팁 섹션 -->
    <div class="example-section">
      <div class="example-title">💡 중첩 Transition 베스트 프랙티스</div>
      <div class="example-content">
        <strong>1. 지연 시간 활용:</strong> 각 레벨에 서로 다른
        <code>transition-delay</code> 설정<br />
        <strong>2. 애니메이션 지속시간 조절:</strong> 부모는 길게, 자식은 짧게
        설정하는 것이 일반적<br />
        <strong>3. 서로 다른 속성 애니메이션:</strong> opacity, transform, scale
        등을 조합<br />
        <strong>4. JavaScript 훅 활용:</strong> 복잡한 타이밍 제어가 필요한
        경우<br />
        <strong>5. 독립적 제어:</strong> 각 transition을 별도 상태로 관리하는
        방법도 고려
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// 반응형 상태
const showNested1 = ref(false);
const showProblem = ref(false);
const showSolution = ref(false);
const showOuter = ref(false);
const showInner = ref(false);
const showJsControl = ref(false);

// 외부 상태가 false가 되면 내부도 자동으로 false
watch(showOuter, newVal => {
  if (!newVal) {
    showInner.value = false;
  }
});

// JavaScript 훅 메서드들 - 외부
const beforeEnterOuter = el => {
  el.style.opacity = '0';
  el.style.transform = 'scale(0.5) translateY(50px)';
};

const enterOuter = (el, done) => {
  el.offsetHeight; // 강제 리플로우
  el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  el.style.opacity = '1';
  el.style.transform = 'scale(1) translateY(0px)';

  // 외부 애니메이션이 완료된 후 완료 신호
  setTimeout(done, 600);
};

const leaveOuter = (el, done) => {
  el.style.transition = 'all 0.4s ease-in';
  el.style.opacity = '0';
  el.style.transform = 'scale(0.5) translateY(-50px)';
  setTimeout(done, 400);
};

// JavaScript 훅 메서드들 - 내부
const beforeEnterInner = el => {
  el.style.opacity = '0';
  el.style.transform = 'translateX(-100%) rotate(45deg)';
};

const enterInner = (el, done) => {
  // 외부 애니메이션이 어느 정도 진행된 후 시작
  setTimeout(() => {
    el.offsetHeight;
    el.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    el.style.opacity = '1';
    el.style.transform = 'translateX(0%) rotate(0deg)';
    setTimeout(done, 500);
  }, 300); // 0.3초 지연
};

const leaveInner = (el, done) => {
  el.style.transition = 'all 0.3s ease-in';
  el.style.opacity = '0';
  el.style.transform = 'translateX(100%) rotate(-45deg)';
  setTimeout(done, 300);
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  color: var(--color-text);
  margin-bottom: 30px;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  background: #f8f9fa;
}

.example-title {
  font-size: 18px;
  font-weight: bold;
  color: #495057;
  margin-bottom: 15px;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 8px;
}

.example-content {
  color: #495057;
  line-height: 1.6;
}

button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin: 5px;
  font-weight: 500;
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.warning {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.success {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

/* 외부 컨테이너 스타일 */
.outer-container {
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  border-radius: 15px;
  padding: 30px;
  margin: 20px 0;
  min-height: 200px;
}

.inner-container {
  background: linear-gradient(45deg, #a8edea, #fed6e3);
  border-radius: 10px;
  padding: 20px;
  margin-top: 15px;
}

.content-box {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  color: #333;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.demo-area {
  min-height: 250px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  position: relative;
}

.status {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
}

/* 외부 transition 스타일 */
.outer-fade-enter-active,
.outer-fade-leave-active {
  transition: all 0.8s ease;
}
.outer-fade-enter-from,
.outer-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-50px);
}

/* 내부 transition 스타일 */
.inner-slide-enter-active,
.inner-slide-leave-active {
  transition: all 0.6s ease 0.3s; /* 0.3초 지연 */
}
.inner-slide-enter-from,
.inner-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* 더 내부 transition 스타일 */
.content-bounce-enter-active {
  animation: bounce-in 0.8s ease 0.6s both; /* 0.6초 지연 */
}
.content-bounce-leave-active {
  animation: bounce-out 0.4s ease both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(90deg);
    opacity: 0.7;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

/* 문제가 있는 케이스 스타일 */
.problem-outer-enter-active,
.problem-outer-leave-active {
  transition: all 0.5s ease;
}
.problem-outer-enter-from,
.problem-outer-leave-to {
  opacity: 0;
}

.problem-inner-enter-active,
.problem-inner-leave-active {
  transition: all 0.5s ease; /* 동시에 실행되어 충돌 */
}
.problem-inner-enter-from,
.problem-inner-leave-to {
  transform: scale(0);
}

/* 해결책 스타일 */
.solution-outer-enter-active,
.solution-outer-leave-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.solution-outer-enter-from,
.solution-outer-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.solution-inner-enter-active,
.solution-inner-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 0.3s;
}
.solution-inner-enter-from,
.solution-inner-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
}

/* 개별 제어 스타일 */
.individual-outer-enter-active,
.individual-outer-leave-active {
  transition: opacity 0.5s ease;
}
.individual-outer-enter-from,
.individual-outer-leave-to {
  opacity: 0;
}

.individual-inner-enter-active,
.individual-inner-leave-active {
  transition: transform 0.4s ease;
}
.individual-inner-enter-from,
.individual-inner-leave-to {
  transform: translateX(100%);
}
</style>
