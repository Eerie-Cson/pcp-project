import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ComponentService } from '../../../features/component/component.service';
import { ObjectId } from '@pcp/object-id';

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
  async getCases() {
    return this.componentService.findCase({});
  }

  @Query('Case')
  findOne(@Args('id') id: ObjectId) {
    return this.componentService.findCase({ id });
  }
}
