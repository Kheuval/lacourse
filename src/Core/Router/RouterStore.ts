import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

export const useRouterStore = defineStore("router", () => {
  const navigationStack: Ref<RouteLocationNormalized[]> = ref([]);

  return { navigationStack };
});
