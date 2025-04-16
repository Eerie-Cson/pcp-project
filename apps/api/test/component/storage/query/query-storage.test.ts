import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { StorageRepository } from '../../../../src/features/component/repository/storage.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Query', () => {
  test('Get Storage', async () => {
    const { module, request, teardown } = await setupFixture();

    const storageRepository = module.get<StorageRepository>(
      ComponentToken.StorageRepository,
    );

    const { componentTimes } = generateComponent<ComponentType.STORAGE>(
      ObjectTypes.STORAGE,
    );

    const storages = componentTimes(3);

    await Promise.all(
      storages.map((component) => storageRepository.create(component)),
    );

    const getStorageResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          storage(id: $id) {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
      variables: {
        id: storages[0].id.toString(),
      },
    });

    await teardown();

    expect(getStorageResponse.status).toEqual(200);
    expect(getStorageResponse.body).not.toHaveProperty('errors');
    expect(getStorageResponse.body.data.storage).toBeTruthy();
    expect(getStorageResponse.body.data.storage).toMatchObject({
      id: storages[0].id.toString(),
      name: storages[0].name,
      partNumber: storages[0].partNumber,
      componentType: ComponentType.STORAGE,
      price: storages[0].price,
    });

    await teardown();
  });
});
