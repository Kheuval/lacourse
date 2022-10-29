import type { ErrorType } from "./AppErrorsEnum";

export type AppError = {
  title: string;
  errorMessage: string;
  errorType: ErrorType;
};
