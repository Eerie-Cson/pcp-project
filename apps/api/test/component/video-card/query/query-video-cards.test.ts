import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import * as R from 'ramda';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { VideoCardRepository } from '../../../../src/features/component/repository/video-card.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
describe('Components.Query', () => {
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

    const getVideoCardsResponse = await request.post('/graphql').send({
      query: `
      query {
        videoCards {
          id
          name
          partNumber
          componentType
          price
        }
      }
    `,
    });

    await teardown();

    expect(getVideoCardsResponse.status).toEqual(200);
    expect(getVideoCardsResponse.body.data.videoCards).toBeTruthy();
    expect(getVideoCardsResponse.body).not.toHaveProperty('errors');
    expect(getVideoCardsResponse.body.data.videoCards).toHaveLength(3);

    await teardown();
  });
});
