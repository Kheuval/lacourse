import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

export const useRouterStore = defineStore("router", () => {
  const navigationStack = ref<RouteLocationNormalized[]>([]);

  return { navigationStack };
});
