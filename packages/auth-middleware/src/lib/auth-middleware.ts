import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(
    req: Request & { claims: any },
    _res: Response,
    next: NextFunction,
  ) {
    if (!req.headers.authorization) return next();

    const token = req.headers.authorization.split('Bearer ')[1];

    try {
      const claims = await this.jwtService.verifyAsync(token);
      req.claims = claims;
    } catch (err) {
      throw new Error();
    }
    return next();
  }
}
