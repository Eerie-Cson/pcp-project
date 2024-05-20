import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ComponentService } from '../../../features/component/component.service';
import { ObjectId } from '@pcp/object-id';
import { CreateCaseInput, UpdateCaseInput } from '../../../libs/graphql-types';

@Resolver('Case')
export class CaseResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation('createCase')
  async createCase(@Args('createCaseInput') createCaseInput: CreateCaseInput) {
    await this.componentService.createCase(createCaseInput);

    return true;
  }

  @Mutation('updateCase')
  async updateCase(
    @Args('id') id: string,
    @Args('updateCaseInput') updateCaseInput: UpdateCaseInput
  ) {
    await this.componentService.updateCase({
      id,
      data: updateCaseInput,
    });

    return true;
  }

  @Mutation('deleteCase')
  async deleteCase(@Args('id') id: string) {
    await this.componentService.deleteCase(id);

    return true;
  }

  @Query('Cases')
  async cases() {
    return this.componentService.findCase({});
  }

  @Query('Case')
  async getCase(@Args('id') id: ObjectId) {
    return this.componentService.findCase({ id });
  }
}
