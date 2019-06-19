import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import Dashboard from "./components/Dashboard.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch("fetchAccessToken");
  store.dispatch("fetchUser");

  if (to.fullPath === "/dashboard") {
    if (!store.state.accessToken) {
      next("/login");
    }
  }
  if (to.fullPath === "/login" || to.fullPath === "/signup") {
    if (store.state.accessToken) {
      next("/dashboard");
    }
  }
  next();
});

export default router;
