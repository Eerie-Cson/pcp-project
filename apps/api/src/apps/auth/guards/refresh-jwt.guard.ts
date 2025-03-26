import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Claims, TokenType } from '../libs/types';
import { ObjectId } from '@pcp/object-id';
import { AccountType } from '@pcp/types';
import { SessionService } from '../../../features/auth/session.service';
import { UserService } from '../../../features/user/user.service';

const JWT_REGEX =
  /Bearer\s*([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$)/i;

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const match = (request.headers.authorization || '').match(JWT_REGEX);

    if (!match) throw new ForbiddenException();

    const [, token] = match;

    try {
      const claims = await this.jwt.verifyAsync<Claims>(token);

      if (claims.type !== TokenType.Refresh) throw new ForbiddenException();

      const session = await this.sessionService.findSession({
        jti: Buffer.from(claims.jti, 'hex'),
      });

      if (!session)
        throw new ForbiddenException({
          code: 'INVALID_TOKEN',
        });

      if (claims.role === AccountType.Member) {
        const account = await this.userService.findUser({
          id: ObjectId.from(claims.sub),
          role: AccountType.Member,
        });

        if (!account) {
          throw new ForbiddenException();
        }
      }

      request.session = session;
      request.claims = claims;

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;

      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException({
          code: 'REFRESH_TOKEN_EXPIRED',
        });
      }

      throw new InternalServerErrorException(error);
    }
  }
}
