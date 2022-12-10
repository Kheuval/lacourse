export interface ValidationInterface {
  valid: boolean;
  message: string;
}

export interface Rule {
  test: (data: string) => ValidationInterface;
  options?: {};
}
