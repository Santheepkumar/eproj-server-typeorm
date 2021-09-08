class NotAuthorizedError extends Error {
  internal: any;
  isOperational: boolean;
  constructor(message, internal) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.internal = internal;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, () => this.constructor.name);
  }
}

export default NotAuthorizedError;
