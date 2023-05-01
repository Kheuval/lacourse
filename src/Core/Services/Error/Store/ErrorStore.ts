import type { AppError } from "@/Core/Services/Error/ErrorInterface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("error", () => {
  const error = ref<AppError | null>(null);

  const setError = (appError: AppError) => {
    error.value = appError;
  };

  return { error, setError };
});
