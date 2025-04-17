import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { StorageRepository } from '../../../../src/features/component/repository/storage.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Delete', () => {
  test('Delete Storage', async () => {
    const { module, request, teardown } = await setupFixture();

    const storageRepository = module.get<StorageRepository>(
      ComponentToken.StorageRepository,
    );

    const { component: storageComponent } =
      generateComponent<ComponentType.STORAGE>(ObjectTypes.STORAGE);

    await storageRepository.create(storageComponent);

    const response = await request.post('/graphql').send({
      query: `
        mutation($id: String!) {
          deleteStorage(id: $id)
        }
      `,
      variables: {
        id: storageComponent.id.toString(),
      },
    });

    const foundStorage = await storageRepository.find(
      ObjectId.from(storageComponent.id.toString()),
    );

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deleteStorage).toBeTruthy();
    expect(foundStorage).toBeNull();

    await teardown();
  });
});
