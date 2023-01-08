import { useUserStore } from "@/Domain/User/Store/UserStore";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useApiStore } from "../Services/Api/ApiStore";
import { ExpiredTokenError } from "../Services/Error/Errors/ExpiredTokenError";
import { UnauthorizedError } from "../Services/Error/Errors/UnauthorizedError";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/Views/LandingView.vue"),
    },
    {
      path: "/user/home",
      name: "UserHome",
      component: () => import("@/Views/HomeView.vue"),
    },
    {
      path: "/recipe/show/:id",
      name: "ShowRecipe",
      component: () => import("@/Views/Recipe/ShowView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = storeToRefs(useUserStore());
  const { checkTokenExpiration } = useApiStore();

  if (!isAuthenticated.value && to.path !== "/") {
    next({ path: "/" });
    new UnauthorizedError();
    return;
  }

  if (isAuthenticated.value && !checkTokenExpiration()) {
    isAuthenticated.value = false;
    next({ path: "/" });
    new ExpiredTokenError();
    return;
  }

  if (isAuthenticated.value && to.path === "/") {
    next({ path: "/user/home" });
    return;
  }

  next();
});
