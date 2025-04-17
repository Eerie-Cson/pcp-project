import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { ComponentService } from '../../../features/component/component.service';
import { CreateCPUInput } from '../../../libs/graphql-types';

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

  @Query('CPU')
  async getCpu(@Args('id') id: string) {
    const cpu = await this.componentService.findCpu({
      id: ObjectId.from(id),
    });

    return cpu;
  }

  @Query('CPUs')
  async getCpus() {
    return this.componentService.findCpus({});
  }

  @Mutation('deleteCPU')
  async deleteCPU(@Args('id') id: string) {
    await this.componentService.deleteCpu(id);

    return true;
  }
}
