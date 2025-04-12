import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectId } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { ComponentService } from '../../../features/component/component.service';
import { CreatePowerSupplyInput } from '../../../libs/graphql-types';

@Resolver('PowerSupply')
export class PowerSupplyResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation('createPowerSupply')
  async createPowerSupply(
    @Args('createPowerSupplyInput')
    createPowerSupplyInput: CreatePowerSupplyInput,
  ) {
    await this.componentService.createPowerSupply({
      ...createPowerSupplyInput,
      componentType: ComponentType.POWER_SUPPLY,
      id: ObjectId.from(createPowerSupplyInput.id),
    });

    return true;
  }
}
