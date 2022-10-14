export class BaseError extends Error {
  message: string;
  status: number;
  category: string;
  error: Record<string, unknown> | undefined;

  constructor(message: string, status?: number, error?: Record<string, unknown>) {
    super();
    this.message = message;
    this.status = status;
    this.error = error;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
