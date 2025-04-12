import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { MemoryRepository } from '../../../../src/features/component/repository/memory.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Query', () => {
  test('Get Memory', async () => {
    const { module, request, teardown } = await setupFixture();

    const memoryRepository = module.get<MemoryRepository>(
      ComponentToken.MemoryRepository,
    );

    const { componentTimes } = generateComponent<ComponentType.MEMORY>(
      ObjectTypes.MEMORY,
    );

    const memorys = componentTimes(3);

    await Promise.all(
      memorys.map((component) => memoryRepository.create(component)),
    );

    const getMemoryResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          memory(id: $id) {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
      variables: {
        id: memorys[0].id.toString(),
      },
    });

    await teardown();

    expect(getMemoryResponse.status).toEqual(200);
    expect(getMemoryResponse.body).not.toHaveProperty('errors');
    expect(getMemoryResponse.body.data.memory).toBeTruthy();
    expect(getMemoryResponse.body.data.memory).toMatchObject({
      id: memorys[0].id.toString(),
      name: memorys[0].name,
      partNumber: memorys[0].partNumber,
      componentType: ComponentType.MEMORY,
      price: memorys[0].price,
    });

    await teardown();
  });
});
