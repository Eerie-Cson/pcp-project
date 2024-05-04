import { Inject, Injectable } from '@nestjs/common';
import { Tokens } from './libs/tokens';
import { UserRepository } from './repository/user.repository';
import { User } from '@pcp/types';
import { ObjectId } from '@pcp/object-id';

@Injectable()
export class UserService {
  constructor(
    @Inject(Tokens.UserRepository)
    private userRepository: UserRepository
  ) {}

  async createUser(data: User) {
    return this.userRepository.create(data);
  }

  async updateUser(params: { id: ObjectId; data: Partial<Omit<User, 'id'>> }) {
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
    return this.userRepository.findOne(params);
  }

  async findUsers() {
    return this.userRepository.find({});
  }
}
