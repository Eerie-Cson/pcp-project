import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { StorageRepository } from '../../../../src/features/component/repository/storage.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Create', () => {
  test('Create Storage', async () => {
    const { module, request, teardown } = await setupFixture();

    const storageRepository = module.get<StorageRepository>(
      ComponentToken.StorageRepository,
    );

    const { component: storageComponent } =
      generateComponent<ComponentType.STORAGE>(ObjectTypes.STORAGE);

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $createStorageInput: CreateStorageInput!
          ) {
            createStorage(createStorageInput: $createStorageInput)
          }
      `,
      variables: {
        createStorageInput: {
          ...storageComponent,
          id: storageComponent.id.toString(),
        },
      },
    });

    const createdStorage = await storageRepository.find(storageComponent.id);
    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createStorage).toBeTruthy();
    expect(createdStorage).toMatchObject({
      id: storageComponent.id.toString(),
      name: storageComponent.name,
      componentType: ComponentType.STORAGE,
      price: storageComponent.price,
      manufacturer: storageComponent.manufacturer,
      partNumber: storageComponent.partNumber,
    });

    await teardown();
  });
});
