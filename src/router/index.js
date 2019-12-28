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
    component: Snake,
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next("/signin");
  }
  next();
});

export default router;
