import { useUserStore } from "@/Domain/User/Store/UserStore";
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
  ],
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useUserStore();
  const { checkTokenExpiration } = useApiStore();

  if (!isAuthenticated && to.path !== "/") {
    next({ path: "/" });
    new UnauthorizedError();
    return;
  }

  if (isAuthenticated && !checkTokenExpiration()) {
    next({ path: "/" });
    new ExpiredTokenError();
    return;
  }

  if (isAuthenticated && to.path === "/") {
    next({ path: "/user/home" });
    return;
  }

  next();
});
