import type { ErrorType } from "../enums/AppErrorsEnum";

export type AppError = {
  title: string;
  errorMessage: string;
  errorType: ErrorType;
};
