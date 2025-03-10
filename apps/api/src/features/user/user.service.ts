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

  async createUser(data: Omit<User, 'dateTimeCreated' | 'dateTimeUpdated'>) {
    return this.userRepository.create({
      ...data,
      dateTimeCreated: new Date(),
      dateTimeUpdated: new Date(),
    });
  }

  async updateUser(params: { id: ObjectId; data: Partial<Omit<User, 'id'>> }) {
    return this.userRepository.update(
      {
        id: params.id,
      },
      params.data
    );
  }

  async deleteUser(id: ObjectId) {
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
}
