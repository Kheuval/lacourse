import type { AppError } from "@/Core/Services/Error/ErrorInterface";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useErrorStore = defineStore("error", () => {
  const error: Ref<AppError | null> = ref(null);

  const setError = (appError: AppError) => {
    error.value = appError;
  };

  return { error, setError };
});
