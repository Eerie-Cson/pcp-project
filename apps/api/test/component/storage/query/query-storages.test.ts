import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { StorageRepository } from '../../../../src/features/component/repository/storage.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
describe('Components.Query', () => {
  test('Get Storages', async () => {
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

    const getStoragesResponse = await request.post('/graphql').send({
      query: `
        query {
          storages {
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

    expect(getStoragesResponse.status).toEqual(200);
    expect(getStoragesResponse.body.data.storages).toBeTruthy();
    expect(getStoragesResponse.body).not.toHaveProperty('errors');
    expect(getStoragesResponse.body.data.storages).toHaveLength(3);

    await teardown();
  });
});
