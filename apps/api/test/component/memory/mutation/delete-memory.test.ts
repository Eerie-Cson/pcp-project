import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { MemoryRepository } from '../../../../src/features/component/repository/memory.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.delete', () => {
  test('Delete Memory', async () => {
    const { module, request, teardown } = await setupFixture();

    const memoryRepository = module.get<MemoryRepository>(
      ComponentToken.MemoryRepository,
    );

    const { component: memoryComponent } =
      generateComponent<ComponentType.MEMORY>(ObjectTypes.MEMORY);

    const response = await request.post('/graphql').send({
      query: `
        mutation($id: String!) {
          deleteMemory(id: $id)
        }
      `,
      variables: {
        id: memoryComponent.id.toString(),
      },
    });

    const foundMemory = await memoryRepository.find(memoryComponent.id);

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deleteMemory).toBeTruthy();
    expect(foundMemory).toBeNull();

    await teardown();
  });
});
