import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { Tokens } from './libs/tokens';
import { UserRepositoryFactory } from './repository/user.repository';

@Module({
  providers: [
    {
      provide: Tokens.UserRepository,
      useFactory: UserRepositoryFactory,
      inject: [getConnectionToken()],
    },
    UserService,
  ],
  exports: [UserService],
})
export class ComponentModule {}
