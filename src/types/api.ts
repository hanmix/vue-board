export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  token: string;
}

// 필요에 따라 아이디 중복 확인 응답 타입을 확장할 수 있음
export interface CheckIdResponse {
  // 예시로 data 없이 단순 성공 여부만 반환하는 경우
  // 실제 응답 구조에 맞게 수정하세요.
}
