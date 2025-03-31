import { Inject, Injectable } from '@nestjs/common';
import { Tokens } from './libs/tokens';
import { AccountRepository } from './repository/account.repository';
import { Account, AccountType } from '@pcp/types';
import { ObjectId } from '@pcp/object-id';

@Injectable()
export class AccountService {
  constructor(
    @Inject(Tokens.AccountRepository)
    private accountRepository: AccountRepository,
  ) {}

  async createAccount(params: {
    id: ObjectId;
    data: {
      username: string;
      name: string;
      role: AccountType;
      email: string;
      password: string;
    };
  }) {
    return this.accountRepository.create({
      id: params.id,
      ...params.data,
      dateTimeCreated: new Date(),
      dateTimeLastUpdated: new Date(),
    });
  }

  async updateAccount(params: {
    id: ObjectId;
    data: Partial<Omit<Account, 'id'>>;
  }) {
    return this.accountRepository.update(
      {
        id: params.id,
      },
      params.data,
    );
  }

  async deleteAccount(id: ObjectId) {
    return this.accountRepository.delete({
      id,
    });
  }

  async findAccount(params: Partial<Account>) {
    return this.accountRepository.find(params);
  }

  async findAccounts(params: Partial<Account>) {
    return this.accountRepository.list(params);
  }
}
