import { Inject, Injectable } from '@nestjs/common';
import { Tokens } from './libs/tokens';
import { UserBuildRepository } from './repository/user-build.repository';
import { UserBuild } from '@pcp/types';

@Injectable()
export class BuildService {
  constructor(
    @Inject(Tokens.UserBuildRepository)
    private userBuildRepository: UserBuildRepository,
  ) {}
  public async createBuild(data: UserBuild) {
    return this.userBuildRepository.create(data);
  }
}
