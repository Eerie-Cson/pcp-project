import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { Tokens } from './libs/tokens';
import { UserRepositoryFactory } from './repository/user.repository';
import { UserBuildRepositoryFactory } from './repository/user-build.repository';

@Module({
  providers: [
    {
      provide: Tokens.UserRepository,
      useFactory: UserRepositoryFactory,
      inject: [getConnectionToken()],
    },
    {
      provide: Tokens.UserBuildRepository,
      useFactory: UserBuildRepositoryFactory,
      inject: [getConnectionToken()],
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
