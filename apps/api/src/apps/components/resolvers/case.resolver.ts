import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ComponentService } from '../../../features/component/component.service';
import { ObjectId } from '@pcp/object-id';
import { CreateCaseInput, UpdateCaseInput } from '../../../libs/graphql-types';
import { ComponentType } from '@pcp/types';

@Resolver('Case')
export class CaseResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation('createCase')
  async createCase(@Args('createCaseInput') createCaseInput: CreateCaseInput) {
    await this.componentService.createCase({
      ...createCaseInput,
      componentType: ComponentType.CASE,
      id: ObjectId.from(createCaseInput.id),
    });

    return true;
  }

  @Mutation('updateCase')
  async updateCase(
    @Args('id') id: string,
    @Args('updateCaseInput') updateCaseInput: UpdateCaseInput,
  ) {
    await this.componentService.updateCase({
      id: ObjectId.from(id),
      data: updateCaseInput,
    });

    return true;
  }

  @Mutation('deleteCase')
  async deleteCase(@Args('id') id: string) {
    await this.componentService.deleteCase(id);

    return true;
  }

  @Query('getCases')
  async getCases() {
    return this.componentService.findCases({});
  }

  //TODO: Remove the [0] when querying for one entity is added
  @Query('getCase')
  async getCase(@Args('id') id: string) {
    return this.componentService.findCase({
      id: ObjectId.from(id),
    });
  }
}
