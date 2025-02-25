import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Tokens } from './libs/tokens';
import { BuildService } from './build.service';
import { UserBuildRepositoryFactory } from './repository/user-build.repository';

@Module({
  providers: [
    {
      provide: Tokens.UserBuildRepository,
      useFactory: UserBuildRepositoryFactory,
      inject: [getConnectionToken()],
    },
    BuildService,
  ],
  exports: [BuildService],
})
export class BuildModule {}
