import Vue from "vue";
import VueRouter from "vue-router";
import Snake from "../views/Snake";
import Signin from "@/components/auth/Signin.vue";
import Register from "@/components/auth/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "snake",
    component: Snake
  },
  {
    path: "/Signin",
    name: "signin",
    component: Signin
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
