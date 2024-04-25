export class ApiError extends Error {
  constructor(
    public readonly status: 401 | 404 | 409,
    public readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

export class InvalidKeyApiError extends ApiError {
  constructor() {
    super(401, 'INVALID_KEY', 'invalid key');
  }
}

export class GameNotFoundError extends ApiError {
  constructor() {
    super(409, 'GAME_NOT_FOUND', 'game not found');
  }
}
