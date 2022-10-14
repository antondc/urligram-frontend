import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  message: string;
  category: string;
  status: 404;
  error: Record<string, unknown>;

  constructor(message: string, error?: Record<string, unknown>) {
    super(message);

    this.message = message;
    this.status = 404;
    this.category = 'NotFoundError';
    this.error = error;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
