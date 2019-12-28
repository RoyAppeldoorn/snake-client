import Vue from "vue";
import VueRouter from "vue-router";
import Snake from "../views/Snake";
import Signin from "@/components/auth/Signin.vue";
import Signup from "@/components/auth/Signup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "snake",
    component: Snake
  },
  {
    path: "/account",
    component: () => import("@/views/Authentication.vue"),
    children: [
      {
        path: "",
        component: Signin
      },
      {
        path: "signin",
        alias: "/signin",
        component: Signin
      },
      {
        path: "signup",
        alias: "/signup",
        component: Signup,
        meta: { transitionName: "slide" }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
