import { AuthError } from "next-auth";

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = "Not found") {
    super(message, 404);
  }
}

export class ValidationError extends CustomError {
  constructor(message = "Validation failed") {
    super(message, 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class InvalidCredentialsError extends AuthError {
  public readonly kind = "signIn";

  constructor() {
    super("Invalid credentials");
    this.type = "CredentialsSignin";
  }
}

export class EmailNotVerifiedError extends AuthError {
  public readonly kind = "signIn";

  constructor() {
    super("Email not verified");
    this.type = "Verification";
  }
}
