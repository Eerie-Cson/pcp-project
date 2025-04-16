import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { ComponentService } from '../../../features/component/component.service';
import { CreateStorageInput } from '../../../libs/graphql-types';

@Resolver('Storage')
export class StorageResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation('createStorage')
  async createStorage(
    @Args('createStorageInput') createStorageInput: CreateStorageInput,
  ) {
    await this.componentService.createStorage({
      ...createStorageInput,
      componentType: ComponentType.STORAGE,
      id: ObjectId.from(createStorageInput.id),
    });

    return true;
  }
}
