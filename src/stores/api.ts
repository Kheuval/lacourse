import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useApiStore = defineStore("api", () => {
  const baseUrl: Ref<string> = ref(import.meta.env.APP_PUBLIC_API_URL);
  const apiUrl: Ref<string> = ref(import.meta.env.APP_API_URL);

  return { baseUrl, apiUrl };
});
