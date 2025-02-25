import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import R from 'ramda';
import { UserService } from '../../../features/user/user.service';
import { ObjectId } from '@pcp/object-id';
import { ObjectTypes } from '@pcp/object-type';
import {
  CreateBuildInput,
  CreateUserInput,
  UpdateUserInput,
} from '../../../libs/graphql-types';

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
  async update(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.usersService.updateUser({
      id,
      data: R.omit(['id'], updateUserInput),
    });
  }

  @Mutation('createBuild')
  async createBuild(
    @Args('createBuildInput') createBuildInput: CreateBuildInput
  ) {
    //Resolve UserID and all component ids here to OBJECTID
    return this.usersService.createBuild(createBuildInput);
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
