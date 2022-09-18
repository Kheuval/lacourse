import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useApiStore = defineStore("api", () => {
  const baseUrl: Ref<string> = ref("https://api.lacourse.shop/api");

  return { baseUrl };
});
