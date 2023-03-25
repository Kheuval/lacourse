import { useUserStore } from "@/Domain/User/Store/UserStore";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useApiStore } from "../Services/Api/ApiStore";
import { ExpiredTokenError } from "../Services/Error/Errors/ExpiredTokenError";
import { UnauthorizedError } from "../Services/Error/Errors/UnauthorizedError";
import { useRouterStore } from "./RouterStore";

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
      path: "/user/recipes",
      name: "UserRecipes",
      component: () => import("@/Views/User/RecipesView.vue"),
    },
    {
      path: "/recipes",
      name: "IndexRecipe",
      component: () => import("@/Views/Recipe/IndexView.vue"),
    },
    {
      path: "/recipes/show/:id",
      name: "ShowRecipe",
      component: () => import("@/Views/Recipe/ShowView.vue"),
    },
    {
      path: "/recipes/create/",
      name: "CreateRecipe",
      component: () => import("@/Views/Recipe/CreateView.vue"),
    },
    {
      path: "/recipes/edit/:id",
      name: "EditRecipe",
      component: () => import("@/Views/Recipe/EditView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = storeToRefs(useUserStore());
  const { checkTokenExpiration } = useApiStore();
  const { navigationStack } = storeToRefs(useRouterStore());

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

  if (to.fullPath !== navigationStack.value.at(-1)?.fullPath) {
    navigationStack.value.push(from);
  } else {
    navigationStack.value.pop();
  }

  next();
});
