import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Claims, TokenType } from '../libs/types';
import { AccountType } from '@pcp/types';
import { ObjectId } from '@pcp/object-id';
import { UserService } from '../../../features/user/user.service';

const JWT_REGEX =
  /Bearer\s*([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$)/i;

@Injectable()
export class AccessJwtGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const match = (request.headers.authorization || '').match(JWT_REGEX);

    if (!match) throw new ForbiddenException();

    const [, token] = match;

    try {
      const claims = await this.jwt.verifyAsync<Claims>(token);

      if (claims.type !== TokenType.Access) throw new ForbiddenException();

      if (claims.role === AccountType.Member) {
        const account = await this.userService.findUser({
          id: ObjectId.from(claims.sub),
          role: AccountType.Member,
        });

        if (!account) {
          throw new ForbiddenException();
        }
      }

      request.claims = claims;

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;

      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException({
          code: 'ACCESS_TOKEN_EXPIRED',
        });
      }

      throw new InternalServerErrorException(error);
    }
  }
}
