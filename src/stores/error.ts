import { ErrorType } from "@/typescript/enums/AppErrorsEnum";
import type { AppError } from "@/typescript/types/AppErrorType";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useErrorStore = defineStore("error", () => {
  const error: Ref<AppError | null> = ref(null);
  const setError = (appError: AppError) => {
    error.value = appError;
  };

  const handleErrors = (appError: { errorType: ErrorType }): void => {
    if (appError.errorType === ErrorType.loginError) {
      handleLoginErrors(appError);
    }
  };

  const handleLoginErrors = (appError: { errorType: ErrorType }): void => {
    setError({
      title: "Erreur",
      errorMessage: "Une erreur est survenue",
      errorType: appError.errorType,
    });
  };

  return { error, handleErrors };
});
