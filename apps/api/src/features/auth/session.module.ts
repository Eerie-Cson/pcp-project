import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { SessionRepositoryFactory } from './repositories/session.repository';
import { Tokens } from './libs/tokens';
import { SessionService } from './session.service';

@Module({
  providers: [
    {
      provide: Tokens.SessionRepository,
      useFactory: SessionRepositoryFactory,
      inject: [getConnectionToken()],
    },
    SessionService,
  ],
  exports: [SessionService],
})
export class SessionModule {}
