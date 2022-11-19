import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/Views/HomeView.vue"),
    },
    {
      path: "/user/home",
      name: "UserHome",
      component: () => import("@/Views/UserHomeView.vue"),
    },
  ],
});

export default router;
