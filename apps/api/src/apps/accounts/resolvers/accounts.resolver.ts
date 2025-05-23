import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import * as R from 'ramda';
import { AccountService } from '../../../features/account/account.service';
import { ObjectId } from '@pcp/object-id';
import {
  CreateAccountInput,
  UpdateAccountInput,
} from '../../../libs/graphql-types';
import { Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Resolver('Account')
export class AccountsResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation('createAccount')
  async create(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    await this.accountService.createAccount({
      id: ObjectId.from(createAccountInput.id),
      data: {
        ...R.pick(
          ['name', 'email', 'password', 'username', 'role'],
          createAccountInput,
        ),
        password: await bcrypt.hash(createAccountInput.password, 10),
      },
    });
    return true;
  }

  @Mutation('updateAccount')
  async updateAccount(
    @Args('id') id: string,
    @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
  ) {
    await this.accountService.updateAccount({
      id: ObjectId.from(id),
      data: updateAccountInput,
    });

    return true;
  }

  @Mutation('deleteAccount')
  async deleteAccount(@Args('id') id: string) {
    await this.accountService.deleteAccount(ObjectId.from(id));
    return true;
  }

  @Query('accounts')
  async accounts() {
    Logger.log('Accounts: ', await this.accountService.findAccounts({}));
    return this.accountService.findAccounts({});
  }

  @Query('account')
  async account(@Args('id') id: string) {
    return this.accountService.findAccount({
      id: ObjectId.from(id),
    });
  }
}
