import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
import { VideoCardRepository } from '../../../../src/features/component/repository/video-card.repository';

describe('Component.Update', () => {
  test('Update VideoCard', async () => {
    const { module, request, teardown } = await setupFixture();

    const videoCardRepository = module.get<VideoCardRepository>(
      ComponentToken.VideoCardRepository,
    );

    const { component: videoCardComponent } =
      generateComponent<ComponentType.VIDEO_CARD>(ObjectTypes.VIDEO_CARD);

    const updateInput = {
      name: 'Updated VideoCard',
    };

    await videoCardRepository.create(videoCardComponent);

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $updateVideoCardInput: UpdateVideoCardInput!
          ) {
            updateVideoCard(id: $id, updateVideoCardInput: $updateVideoCardInput)
          }
      `,
      variables: {
        id: videoCardComponent.id.toString(),
        updateVideoCardInput: updateInput,
      },
    });

    const updatedVideoCard = await videoCardRepository.find(
      videoCardComponent.id,
    );

    await teardown();
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.updateVideoCard).toBeTruthy();
    expect(updatedVideoCard.name).toBe(updateInput.name);

    await teardown();
  });
});
