import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import * as R from 'ramda';
import { UserService } from '../../../features/user/user.service';
import { ObjectId } from '@pcp/object-id';
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
    await this.usersService.updateUser({
      id: ObjectId.from(id),
      data: updateUserInput,
    });

    return true;
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: string) {
    await this.usersService.deleteUser(ObjectId.from(id));
    return true;
  }

  @Query('users')
  async users() {
    return this.usersService.findUser({});
  }

  @Query('user')
  async user(@Args('id') id: string) {
    const users = await this.usersService.findUser({ id: ObjectId.from(id) });

    return users[0];
  }
}
