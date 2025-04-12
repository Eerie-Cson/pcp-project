import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { MemoryRepository } from '../../../../src/features/component/repository/memory.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Create', () => {
  test('Create Memory', async () => {
    const { module, request, teardown } = await setupFixture();

    const memoryRepository = module.get<MemoryRepository>(
      ComponentToken.MemoryRepository,
    );

    const { component: memoryComponent } =
      generateComponent<ComponentType.MEMORY>(ObjectTypes.MEMORY);

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $createMemoryInput: CreateMemoryInput!
          ) {
            createMemory(createMemoryInput: $createMemoryInput)
          }
      `,
      variables: {
        createMemoryInput: {
          ...memoryComponent,
          id: memoryComponent.id.toString(),
        },
      },
    });

    const createdMemory = await memoryRepository.find(memoryComponent.id);

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createMemory).toBeTruthy();
    expect(createdMemory).toMatchObject({
      id: memoryComponent.id.toString(),
      name: memoryComponent.name,
      componentType: ComponentType.MEMORY,
      price: memoryComponent.price,
      manufacturer: memoryComponent.manufacturer,
      partNumber: memoryComponent.partNumber,
    });

    await teardown();
  });
});
