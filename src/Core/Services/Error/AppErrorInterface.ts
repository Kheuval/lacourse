import type { ErrorType } from "./AppErrorsEnum";

export interface AppError {
  title: string;
  errorMessage: string;
  errorType: ErrorType;
}
