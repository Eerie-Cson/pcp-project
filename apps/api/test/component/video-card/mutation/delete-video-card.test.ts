import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { generateComponent } from 'apps/api/test/helpers/generate-component';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { VideoCardRepository } from '../../../../src/features/component/repository/video-card.repository';
import { setupFixture } from '../../component-fixture';

describe('Component.delete', () => {
  test('Delete Video Card', async () => {
    const { module, teardown, request } = await setupFixture();

    const videoCardRepository = module.get<VideoCardRepository>(
      ComponentToken.VideoCardRepository,
    );

    const { component: videoCardComponent } =
      generateComponent<ComponentType.VIDEO_CARD>(ObjectTypes.VIDEO_CARD);

    await videoCardRepository.create(videoCardComponent);

    const response = await request.post('/graphql').send({
      query: `
        mutation($id: String!) {
          deleteVideoCard(id: $id)
        }`,
      variables: {
        id: videoCardComponent.id.toString(),
      },
    });

    const foundVideoCard = await videoCardRepository.find(
      videoCardComponent.id,
    );

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deleteVideoCard).toBeTruthy();
    expect(foundVideoCard).toBeNull();

    await teardown();
  });
});
