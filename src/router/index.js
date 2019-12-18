import Vue from "vue";
import VueRouter from "vue-router";
import Snake from "../views/Snake";
import Signin from "@/views/Signin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "snake",
    component: Snake
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
