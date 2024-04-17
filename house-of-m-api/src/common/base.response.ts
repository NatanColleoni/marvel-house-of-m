export class SuccessResponse<T = any> {
  success: boolean;
  data?: T | null;

  constructor(data: T | null) {
    this.success = true;
    this.data = data;
  }
}

export class ErrorResponse<T = any> {
  success: boolean;
  error: T;
  errorMessage: string;

  constructor(error: T, message: string) {
    this.success = false;
    this.error = error;
    this.errorMessage = message;
  }
}
