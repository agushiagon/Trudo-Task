import Vue from "vue";
import VueRouter from "vue-router";
import News from "../views/News.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "news",
    component: News,
  },
  {
    path: "/auth",
    name: "UserAuth",
    component: () => import("../views/UserAuth.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
