import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { ComponentService } from '../../../features/component/component.service';
import { CreateMemoryInput } from '../../../libs/graphql-types';

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
  @Query('memory')
  async getMemory(@Args('id') id: string) {
    const memory = await this.componentService.findMemory({
      id: ObjectId.from(id),
    });

    return memory;
  }

  @Query('memorys')
  async getMemorys() {
    return this.componentService.findMemorys({});
  }
}
