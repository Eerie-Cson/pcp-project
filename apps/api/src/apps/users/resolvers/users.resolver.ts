import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import R from 'ramda';
import { UserService } from '../../../features/user/user.service';
import { ObjectId } from '@pcp/object-id';
import { ObjectTypes } from '@pcp/object-type';
import { CreateUserInput, UpdateUserInput } from '../../../libs/graphql-types';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    const id = await ObjectId.generate(ObjectTypes.USER);
    await this.usersService.createUser({ id, ...createUserInput });
    return true;
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser({
      id: updateUserInput.id,
      data: R.omit(['id'], updateUserInput),
    });
  }

  // @Mutation('removeUser')
  // async removeUser(@Args('id') id: string) {
  //   await this.usersService.removeUser(id);
  //   return true;
  // }

  // @Query('users')
  // async getUsers() {
  //   return this.usersService.findUsers();
  // }

  // @Query('user')
  // findOne(@Args('id') id: string) {
  //   return this.usersService.findUser({ id });
  // }
}
