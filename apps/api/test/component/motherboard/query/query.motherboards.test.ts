import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { MotherboardRepository } from '../../../../src/features/component/repository/motherboard.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
describe('Components.Query', () => {
  test('Get Motherboards', async () => {
    const { module, request, teardown } = await setupFixture();

    const memoryRepository = module.get<MotherboardRepository>(
      ComponentToken.MotherboardRepository,
    );

    const { componentTimes } = generateComponent<ComponentType.MOTHERBOARD>(
      ObjectTypes.MOTHERBOARD,
    );

    const motherboards = componentTimes(3);

    await Promise.all(
      motherboards.map((component) => memoryRepository.create(component)),
    );

    const getMotherboardsResponse = await request.post('/graphql').send({
      query: `
        query {
          motherboards {
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

    expect(getMotherboardsResponse.status).toEqual(200);
    expect(getMotherboardsResponse.body.data.motherboards).toBeTruthy();
    expect(getMotherboardsResponse.body).not.toHaveProperty('errors');
    expect(getMotherboardsResponse.body.data.motherboards).toHaveLength(3);

    await teardown();
  });
});
