import { ObjectTypes, ObjectId } from '@pcp/object-id';
import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
  ForbiddenException,
  Delete,
  InternalServerErrorException,
  Get,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import R from 'ramda';
import { DateTime } from 'luxon';
import { randomBytes } from 'crypto';
import { AccessJwtGuard } from './guards/access-jwt.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { AccountType } from '@pcp/types';
import { TokenType, AuthRequest } from './libs/types';
import { Session } from '@pcp/types';
import { SessionService } from '../../features/auth/session.service';
import { BasicGuard } from './guards/basic.guard';

@Controller()
export class SessionController {
  constructor(
    private readonly session: SessionService,
    private readonly jwt: JwtService,
  ) {}

  @Post('sessions')
  @UseGuards(BasicGuard)
  @HttpCode(201)
  async createSession(@Request() request: AuthRequest) {
    const timestamp = new Date();

    const ttl = <string>request.query.ttl ?? '10m';

    const { user } = request;

    try {
      if (user.role === AccountType.MEMBER) {
        await this.session.deleteSession({
          user: user.id,
        });
      }

      const session: Session = {
        id: ObjectId.generate(ObjectTypes.SESSION),
        account: user.id,
        jti: randomBytes(12),
        dateTimeCreated: timestamp,
        dateTimeLastRefreshed: timestamp,
      };

      await this.session.createSession(session);

      const claims = {
        sub: user.id.toString(),
        role: user.role,
        jti: session.jti.toString('hex'),
        iap: DateTime.fromJSDate(timestamp)
          .minus({
            second: 30,
          })
          .toISO(),
      };

      const [accessToken, refreshToken] = await Promise.all([
        this.jwt.signAsync(
          {
            ...claims,
            type: TokenType.Access,
          },
          {
            expiresIn: ttl,
          },
        ),
        this.jwt.signAsync(
          {
            ...claims,
            type: TokenType.Refresh,
          },
          {
            expiresIn: '3d',
          },
        ),
      ]);

      return {
        session: {
          id: session.id.toString(),
          dateTimeCreated: session.dateTimeCreated.toISOString(),
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;

      throw new InternalServerErrorException(error);
    }
  }

  @Get('session')
  @UseGuards(AccessJwtGuard)
  @HttpCode(200)
  async getSession(@Request() request: AuthRequest) {
    const { claims } = request;

    const session = await this.session.findSession({
      jti: Buffer.from(claims.jti, 'hex'),
    });

    if (!session) throw new ForbiddenException();

    return {
      id: session.id.toString(),
      dateTimeCreated: session.dateTimeCreated.toISOString(),
    };
  }

  @Delete('session')
  @UseGuards(AccessJwtGuard)
  @HttpCode(200)
  async deleteSession(@Request() request: AuthRequest) {
    const { claims } = request;

    await this.session.deleteSession({
      jti: Buffer.from(claims.jti, 'hex'),
    });

    return true;
  }

  @Post('session/refresh')
  @UseGuards(RefreshJwtGuard)
  @HttpCode(200)
  async refreshToken(@Request() request: AuthRequest) {
    await this.session.updateSession(
      {
        id: request.session.id,
      },
      {
        dateTimeLastRefreshed: new Date(),
      },
    );

    const claims = {
      ...R.pick(['sub', 'role', 'jti'], request.claims),

      iap: DateTime.now()
        .minus({
          second: 30,
        })
        .toISO(),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        {
          ...claims,
          type: TokenType.Access,
        },
        {
          expiresIn: (request.query.ttl as string) || '10m',
        },
      ),
      this.jwt.signAsync(
        {
          ...claims,
          type: TokenType.Refresh,
        },
        {
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
