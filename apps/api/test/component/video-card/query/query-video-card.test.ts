import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { VideoCardRepository } from '../../../../src/features/component/repository/video-card.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Query', () => {
  test('Get Video Card', async () => {
    const { module, request, teardown } = await setupFixture();

    const videoCardRepository = module.get<VideoCardRepository>(
      ComponentToken.VideoCardRepository,
    );

    const { componentTimes } = generateComponent<ComponentType.VIDEO_CARD>(
      ObjectTypes.VIDEO_CARD,
    );

    const videoCards = componentTimes(3);

    await Promise.all(
      videoCards.map((component) => videoCardRepository.create(component)),
    );

    const getVideoCardResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          videoCard(id: $id) {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
      variables: {
        id: videoCards[0].id.toString(),
      },
    });

    await teardown();

    expect(getVideoCardResponse.status).toEqual(200);
    expect(getVideoCardResponse.body).not.toHaveProperty('errors');
    expect(getVideoCardResponse.body.data.videoCard).toBeTruthy();
    expect(getVideoCardResponse.body.data.videoCard).toMatchObject({
      id: videoCards[0].id.toString(),
      name: videoCards[0].name,
      partNumber: videoCards[0].partNumber,
      componentType: ComponentType.VIDEO_CARD,
      price: videoCards[0].price,
    });

    await teardown();
  });
});
