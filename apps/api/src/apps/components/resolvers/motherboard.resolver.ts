import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { ComponentService } from '../../../features/component/component.service';
import { CreateMotherboardInput } from '../../../libs/graphql-types';

@Resolver('Motherboard')
export class MotherboardResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation('createMotherboard')
  async createMotherboard(
    @Args('createMotherboardInput')
    createMotherboardInput: CreateMotherboardInput,
  ) {
    await this.componentService.createMotherboard({
      ...createMotherboardInput,
      componentType: ComponentType.MOTHERBOARD,
      id: ObjectId.from(createMotherboardInput.id),
    });

    return true;
  }

  @Query('motherboard')
  async getMotherboard(@Args('id') id: string) {
    const motherboard = await this.componentService.findMotherboard({
      id: ObjectId.from(id),
    });

    return motherboard;
  }

  @Query('motherboards')
  async getMotherboards() {
    return this.componentService.findMotherboards({});
  }
}
