export interface AppError {
  title: string;
  errorMessage: string;
}

export interface Error {
  throwError(): void;
}
