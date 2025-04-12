import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { MemoryRepository } from '../../../../src/features/component/repository/memory.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
describe('Components.Query', () => {
  test('Get Memories', async () => {
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

    const getMemorysResponse = await request.post('/graphql').send({
      query: `
        query {
          memorys {
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

    expect(getMemorysResponse.status).toEqual(200);
    expect(getMemorysResponse.body.data.memorys).toBeTruthy();
    expect(getMemorysResponse.body).not.toHaveProperty('errors');
    expect(getMemorysResponse.body.data.memorys).toHaveLength(3);

    await teardown();
  });
});
