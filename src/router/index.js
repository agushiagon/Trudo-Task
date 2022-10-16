import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/news",
  },
  {
    path: "/news",
    name: "news",
    component: () => import("../views/News.vue"),
  },
  {
    path: "/auth",
    name: "UserAuth",
    component: () => import("../views/UserAuth.vue"),
  },
  {
    path: "/user-profile",
    name: "UserProfile",
    component: () => import("../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/user-news",
    name: "UserNews",
    component: () => import("../views/UserNews.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/error",
    name: "error",
    component: () => import("../views/Error.vue"),
  },
  {
    path: "*",
    redirect: "/error",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/news");
  } else {
    next();
  }
});

export default router;
