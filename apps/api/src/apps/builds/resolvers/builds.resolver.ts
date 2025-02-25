import { Resolver } from '@nestjs/graphql';
import { Mutation, Args } from '@nestjs/graphql';
import { BuildService } from '../../../features/build/build.service';
import { CreateBuildInput } from '../../../libs/graphql-types';

@Resolver('Build')
export class BuildResolver {
  constructor(private readonly buildService: BuildService) {}
  @Mutation('createBuild')
  async createBuild(
    @Args('createBuildInput') createBuildInput: CreateBuildInput
  ) {
    //Resolve UserID and all component ids here to OBJECTID
    return this.buildService.createBuild(createBuildInput);
  }
}
