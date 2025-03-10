import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import * as R from 'ramda';
import { UserService } from '../../../features/user/user.service';
import { ObjectId } from '@pcp/object-id';
import { ObjectTypes } from '@pcp/object-type';
import { CreateUserInput, UpdateUserInput } from '../../../libs/graphql-types';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    await this.usersService.createUser({
      id: ObjectId.from(createUserInput.id),
      ...R.pick(['name', 'email', 'password', 'username'], createUserInput),
    });
    return true;
  }

  @Mutation('updateUser')
  async update(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.updateUser({
      id: ObjectId.from(id),
      data: updateUserInput,
    });
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: string) {
    await this.usersService.deleteUser(ObjectId.from(id));
    return true;
  }

  @Query('users')
  async getUsers() {
    return this.usersService.findUsers();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.usersService.findUser({ id: ObjectId.from(id) });
  }
}
