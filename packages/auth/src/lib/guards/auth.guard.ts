import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Roles } from '@pcp/auth';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      Roles,
      context.getHandler(),
    );

    if (!requiredRoles) return true;

    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.req || !ctx.req.claims) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (!requiredRoles.includes(ctx.req.claims.role)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
