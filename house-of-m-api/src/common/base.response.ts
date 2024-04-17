export class SuccessResponse<T = any> {
  data?: T | null;
  success: boolean;

  constructor(data: T | null) {
    this.data = data;
    this.success = true;
  }
}

export class ErrorResponse<T = any> {
  error: T;
  errorMessage: string;
  success: boolean;

  constructor(error: T, message: string) {
    this.error = error;
    this.success = false;
    this.errorMessage = message;
  }
}
