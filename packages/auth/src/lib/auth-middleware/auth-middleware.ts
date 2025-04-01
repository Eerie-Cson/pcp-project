import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

const JWT_REGEX =
  /Bearer\s*([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$)/i;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(
    req: Request & { claims: any },
    _res: Response,
    next: NextFunction,
  ) {
    if (!req.headers.authorization) {
      return next();
    }

    const [, token] = (req.headers.authorization || '').match(JWT_REGEX) || [];

    if (!token) return next();

    try {
      const claims = await this.jwtService.verifyAsync(token);
      req.claims = claims;
    } catch (err) {
      if ((err as Error).name === 'JsonWebTokenError') {
        throw new HttpException(
          {
            code: 'FORBIDDEN',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      if ((err as Error).name === 'TokenExpiredError') {
        throw new HttpException(
          {
            code: 'ACCESS_TOKEN_EXPIRED',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }
    return next();
  }
}
