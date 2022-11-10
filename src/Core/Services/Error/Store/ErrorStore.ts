import { ErrorType } from "@/Core/Services/Error/AppErrorsEnum";
import type { AppError } from "@/Core/Services/Error/AppErrorType";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useErrorStore = defineStore("error", () => {
  const error: Ref<AppError | null> = ref(null);
  const setError = (appError: AppError) => {
    error.value = appError;
  };

  const handleErrors = (appError: { errorType: ErrorType }): void => {
    if (appError.errorType === ErrorType.unauthorizedError) {
      handleUnauthorizedError(appError);
    } else if (appError.errorType === ErrorType.forbiddenError) {
      handleForbiddenError(appError);
    } else if (appError.errorType === ErrorType.resourceNotFoundError) {
      handleResourceNotFoundError(appError);
    } else if (appError.errorType === ErrorType.loginError) {
      handleLoginError(appError);
    } else if (appError.errorType == ErrorType.unprocessableEntity) {
      handleUnprocessableEntity(appError);
    } else {
      handleGenericError(appError);
    }
  };

  const handleUnauthorizedError = (appError: {
    errorType: ErrorType;
  }): void => {
    setError({
      title: "Erreur",
      errorMessage: "Vous devez vous identifier",
      errorType: appError.errorType,
    });
  };

  const handleForbiddenError = (appError: { errorType: ErrorType }): void => {
    setError({
      title: "Erreur",
      errorMessage: "Vous n'avez pas le droit d'effectuer cette action",
      errorType: appError.errorType,
    });
  };

  const handleResourceNotFoundError = (appError: {
    errorType: ErrorType;
  }): void => {
    setError({
      title: "Erreur",
      errorMessage: "La resource est introuvable",
      errorType: appError.errorType,
    });
  };

  const handleLoginError = (appError: { errorType: ErrorType }): void => {
    setError({
      title: "Erreur",
      errorMessage: "Identifiants incorrects",
      errorType: appError.errorType,
    });
  };

  const handleUnprocessableEntity = (appError: {
    errorType: ErrorType;
  }): void => {
    setError({
      title: "Erreur",
      errorMessage: "L'entité est malformée",
      errorType: appError.errorType,
    });
  };

  const handleGenericError = (appError: { errorType: ErrorType }): void => {
    setError({
      title: "Erreur",
      errorMessage: "Une erreur est survenue, merci de rééssayer",
      errorType: appError.errorType,
    });
  };

  return { error, handleErrors };
});
