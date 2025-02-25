import { Inject, Injectable } from '@nestjs/common';
import R from 'ramda';
import { Tokens } from './libs/tokens';
import { UserRepository } from './repository/user.repository';
import { UserBuildRepository } from './repository/user-build.repository';
import { User, UserBuild } from '@pcp/types';
import { ObjectId } from '@pcp/object-id';

@Injectable()
export class UserService {
  constructor(
    @Inject(Tokens.UserRepository)
    private userRepository: UserRepository,

    @Inject(Tokens.UserBuildRepository)
    private userBuildRepository: UserBuildRepository
  ) {}

  async createUser(data: R.Omit<User, 'dateTimeCreated' | 'dateTimeUpdated'>) {
    return this.userRepository.create({
      ...data,
      dateTimeCreated: new Date(),
      dateTimeUpdated: new Date(),
    });
  }

  async updateUser(params: { id: string; data: Partial<Omit<User, 'id'>> }) {
    return this.userRepository.update(
      {
        id: params.id,
      },
      params.data
    );
  }

  async removeUser(id: ObjectId) {
    return this.userRepository.delete({
      id,
    });
  }

  async findUser(params: Partial<User>) {
    return this.userRepository.find(params);
  }

  async findUsers() {
    return this.userRepository.find({});
  }

  public async createBuild(
    data: Omit<UserBuild, 'dateTimeCreated' | 'dateTimeUpdated'>
  ) {
    return this.userBuildRepository.create({
      ...data,
      dateTimeCreated: new Date(),
      dateTimeUpdated: new Date(),
    });
  }
}
