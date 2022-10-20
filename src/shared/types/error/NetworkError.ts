import { BaseError } from './BaseError';

export class NetworkError extends BaseError {
  message: string;
  category: string;
  status: 404;
  error: Record<string, unknown>;

  constructor(message: string, error?: Record<string, unknown>) {
    super(message);

    this.message = message;
    this.status = 404;
    this.category = 'NetworkError';
    this.error = error;
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
