// src/utils/jwt.ts
import { jwtDecode } from 'jwt-decode';

// JWT 페이로드 타입 정의 (서버 토큰 구조에 맞게 수정)
export interface JwtPayload {
  id: string;
  exp?: number; // 만료 시간(Unix timestamp)
  iat?: number; // 발급 시간
}

export const parseJwt = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};
