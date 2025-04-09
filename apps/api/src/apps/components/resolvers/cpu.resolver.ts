import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ComponentService } from '../../../features/component/component.service';
import { ObjectId } from '@pcp/object-id';
import { CreateCPUInput } from '../../../libs/graphql-types';
import { ComponentType } from '@pcp/types';

@Resolver('Cpu')
export class CpuResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation('createCPU')
  async createCPU(@Args('createCPUInput') createCPUInput: CreateCPUInput) {
    await this.componentService.createCpu({
      ...createCPUInput,
      componentType: ComponentType.CPU,
      id: ObjectId.from(createCPUInput.id),
    });

    return true;
  }
}
