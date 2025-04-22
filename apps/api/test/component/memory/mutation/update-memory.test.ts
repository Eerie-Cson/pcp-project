import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
import { MemoryRepository } from '../../../../src/features/component/repository/memory.repository';

describe('Component.Update', () => {
  test('Update Memory', async () => {
    const { module, request, teardown } = await setupFixture();

    const memoryRepository = module.get<MemoryRepository>(
      ComponentToken.MemoryRepository,
    );

    const { component: memoryComponent } =
      generateComponent<ComponentType.MEMORY>(ObjectTypes.MEMORY);

    const updateInput = {
      name: 'Updated Memory',
    };

    await memoryRepository.create(memoryComponent);

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $updateMemoryInput: UpdateMemoryInput!
          ) {
            updateMemory(id: $id, updateMemoryInput: $updateMemoryInput)
          }
      `,
      variables: {
        id: memoryComponent.id.toString(),
        updateMemoryInput: updateInput,
      },
    });

    const updatedMemory = await memoryRepository.find(memoryComponent.id);

    await teardown();
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.updateMemory).toBeTruthy();
    expect(updatedMemory.name).toBe(updateInput.name);

    await teardown();
  });
});
