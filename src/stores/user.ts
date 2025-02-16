import { defineStore } from "pinia";
import type { User } from "../types/user";
import { login } from "../apis/auth";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
    token: null as string | null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await login(email, password);
        console.log(response);
        if (response.isSuccess) {
          const token = response.data.token;
          this.token = token;
          const decoded = jwtDecode<DecodedToken>(token);
          const existingUser = this.users.find(
            (user: User) => user.id === decoded.id
          );

          if (!existingUser) {
            const newUser: User = {
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
              password: decoded.password,
              role: decoded.role,
            };
            this.users.push(newUser);
            this.currentUser = newUser;
            console.log("로그인 성공", this.currentUser.id);
          } else {
            this.currentUser = existingUser;
          }
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  },
});
