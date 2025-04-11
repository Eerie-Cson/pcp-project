import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { ComponentService } from '../../../features/component/component.service';
import { CreateVideoCardInput } from '../../../libs/graphql-types';

@Resolver('VideoCard')
export class VideoCardResolver {
  constructor(private readonly componentService: ComponentService) {}

  @Mutation('createVideoCard')
  async createVideoCard(
    @Args('createVideoCardInput') createVideoCardInput: CreateVideoCardInput,
  ) {
    await this.componentService.createVideoCard({
      ...createVideoCardInput,
      componentType: ComponentType.VIDEO_CARD,
      id: ObjectId.from(createVideoCardInput.id),
    });

    return true;
  }
}
