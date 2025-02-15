import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import BoardPage from "../pages/BoardPage.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";

export const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/signIn",
    name: "signIn",
    component: SignIn,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: SignUp,
  },
  {
    path: "/board",
    name: "board",
    component: BoardPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
