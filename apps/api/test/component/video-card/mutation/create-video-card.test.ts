import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { VideoCardRepository } from '../../../../src/features/component/repository/video-card.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Create', () => {
  test('Create Video Card', async () => {
    const { module, request, teardown } = await setupFixture();

    const videoCardRepository = module.get<VideoCardRepository>(
      ComponentToken.VideoCardRepository,
    );

    const { component: videoCardComponent } =
      generateComponent<ComponentType.VIDEO_CARD>(ObjectTypes.VIDEO_CARD);

    const response = await request.post('/graphql').send({
      query: `
           mutation(
             $createVideoCardInput: CreateVideoCardInput!
           ) {
             createVideoCard(createVideoCardInput: $createVideoCardInput)
           }
       `,
      variables: {
        createVideoCardInput: {
          ...videoCardComponent,
          id: videoCardComponent.id.toString(),
        },
      },
    });

    const createdVideoCard = await videoCardRepository.find(
      videoCardComponent.id,
    );

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createVideoCard).toBeTruthy();
    expect(createdVideoCard).toMatchObject({
      id: videoCardComponent.id.toString(),
      name: videoCardComponent.name,
      componentType: ComponentType.VIDEO_CARD,
      price: videoCardComponent.price,
      manufacturer: videoCardComponent.manufacturer,
      partNumber: videoCardComponent.partNumber,
    });

    await teardown();
  });
});
