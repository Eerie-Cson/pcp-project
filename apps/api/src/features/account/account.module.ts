import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { AccountService } from './account.service';
import { Tokens } from './libs/tokens';
import { AccountRepositoryFactory } from './repository/account.repository';

@Module({
  providers: [
    {
      provide: Tokens.AccountRepository,
      useFactory: AccountRepositoryFactory,
      inject: [getConnectionToken()],
    },
    AccountService,
  ],
  exports: [AccountService],
})
export class AccountModule {}
