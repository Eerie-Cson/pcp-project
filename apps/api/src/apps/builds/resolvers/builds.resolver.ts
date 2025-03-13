import { Resolver } from '@nestjs/graphql';
import * as R from 'ramda';

import { Mutation, Args } from '@nestjs/graphql';
import { BuildService } from '../../../features/build/build.service';
import { CreateBuildInput } from '../../../libs/graphql-types';
import { ObjectId } from '@pcp/object-id';

@Resolver('Build')
export class BuildResolver {
  constructor(private readonly buildService: BuildService) {}
  @Mutation('createBuild')
  async createBuild(
    @Args('createBuildInput') createBuildInput: CreateBuildInput,
  ) {
    //Resolve UserID and all component ids here to OBJECTID

    await this.buildService.createBuild({
      id: ObjectId.from(createBuildInput.id),
      ...R.omit(['id'], createBuildInput),
    });

    return true;
  }
}
