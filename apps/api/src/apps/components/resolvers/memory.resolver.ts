import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ComponentService } from '../../../features/component/component.service';
import { ObjectId } from '@pcp/object-id';
import { CreateMemoryInput } from '../../../libs/graphql-types';
import { ComponentType } from '@pcp/types';

@Resolver('Memory')
export class MemoryResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation('createMemory')
  async createMemory(
    @Args('createMemoryInput') createMemoryInput: CreateMemoryInput,
  ) {
    console.log('createed');
    await this.componentService.createMemory({
      ...createMemoryInput,
      componentType: ComponentType.MEMORY,
      id: ObjectId.from(createMemoryInput.id),
    });

    return true;
  }
}
